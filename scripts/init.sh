#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    printf "${BLUE}[INFO]${NC} %s\n" "$1"
}

print_success() {
    printf "${GREEN}[SUCCESS]${NC} %s\n" "$1"
}

print_warning() {
    printf "${YELLOW}[WARNING]${NC} %s\n" "$1"
}

print_error() {
    printf "${RED}[ERROR]${NC} %s\n" "$1"
}

# Function to convert string to snake_case
to_snake_case() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g' | sed 's/^_\|_$//g'
}

# Function to collect user input
collect_user_input() {
    echo ""
    printf "${BLUE}🔧 Project Configuration${NC}\n"
    echo "=========================="
    
    # Ask for site name
    while [ -z "$SITE_NAME" ]; do
        printf "Enter your site name: "
        read -r SITE_NAME
        if [ -z "$SITE_NAME" ]; then
            print_warning "Site name cannot be empty. Please try again."
        fi
    done
    
    # Ask for database name with default
    DEFAULT_DB_NAME=$(to_snake_case "$SITE_NAME")
    printf "Enter your database name (default: %s): " "$DEFAULT_DB_NAME"
    read -r DB_NAME
    if [ -z "$DB_NAME" ]; then
        DB_NAME="$DEFAULT_DB_NAME"
    fi
    
    print_success "Site Name: $SITE_NAME"
    print_success "Database Name: $DB_NAME"
    echo ""
}

# Function to replace placeholders in files
replace_placeholders() {
    print_status "Replacing placeholders in project files..."
    
    # Replace SITE_NAME in page.tsx
    if [ -f "apps/web/src/app/page.tsx" ]; then
        sed -i.bak "s/SITE_NAME/$SITE_NAME/g" apps/web/src/app/page.tsx
        rm apps/web/src/app/page.tsx.bak 2>/dev/null || true
        print_success "Updated apps/web/src/app/page.tsx"
    fi
    
    # Replace SITE_NAME in site.ts
    if [ -f "apps/web/src/config/site.ts" ]; then
        sed -i.bak "s/SITE_NAME/$SITE_NAME/g" apps/web/src/config/site.ts
        rm apps/web/src/config/site.ts.bak 2>/dev/null || true
        print_success "Updated apps/web/src/config/site.ts"
    fi
    
    # Replace DB_NAME in docker-compose.yml
    if [ -f "docker-compose.yml" ]; then
        sed -i.bak "s/DB_NAME/$DB_NAME/g" docker-compose.yml
        rm docker-compose.yml.bak 2>/dev/null || true
        print_success "Updated docker-compose.yml"
    fi
    
    print_success "All placeholders replaced successfully!"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 20+ from https://nodejs.org/"
        exit 1
    fi
    
    if ! command -v pnpm &> /dev/null; then
        print_error "pnpm is not installed. Please install pnpm from https://pnpm.io/"
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker from https://www.docker.com/"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose"
        exit 1
    fi
    
    print_success "All requirements are met!"
}

# Create environment files
create_env_files() {
    print_status "Creating environment files..."
    
    # Server .env
    if [ ! -f "apps/server/.env" ]; then
        # Generate secure JWT secrets
        JWT_SECRET=$(openssl rand -base64 32)
        JWT_REFRESH_SECRET=$(openssl rand -base64 32)
        
        cat > apps/server/.env << EOF
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://developer:test@localhost:5432/${DB_NAME}
REDIS_URL=redis://localhost:6379
JWT_SECRET=${JWT_SECRET}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
EOF
        print_success "Created apps/server/.env with generated JWT secrets"
    else
        print_warning "apps/server/.env already exists, skipping..."
    fi
    
    # Web .env
    if [ ! -f "apps/web/.env.local" ]; then        
        cat > apps/web/.env.local << EOF
ANALYZE=false
NODE_ENV=development
DATABASE_URL=postgresql://developer:test@localhost:5432/${DB_NAME}?schema=public
JWT_SECRET=secret
JWT_REFRESH_SECRET=refresh_secret
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_API_URL=http://localhost:5002
NEXTAUTH_URL=http://localhost:3000
EOF
        # Generate NextAuth secret
        cd apps/web
        npx auth secret
        cd ../..
        
        print_success "Created apps/web/.env.local with generated NextAuth secret"
    else
        print_warning "apps/web/.env.local already exists, skipping..."
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    pnpm install
    print_success "Dependencies installed successfully!"
}

# Start Docker services
start_docker_services() {
    print_status "Starting Docker services..."
    docker-compose up -d
    print_success "Docker services started successfully!"
}

# Wait for database to be ready
wait_for_database() {
    print_status "Waiting for database to be ready..."
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if docker exec db pg_isready -U developer -d "$DB_NAME" &> /dev/null; then
            print_success "Database is ready!"
            return 0
        fi
        
        print_status "Waiting for database... (attempt $attempt/$max_attempts)"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "Database failed to start within expected time"
    return 1
}

# Initialize database
init_db() {
    print_status "Running database migrations..."
    cd apps/server
    pnpm run db:generate
    pnpm run db:push
    cd ../..
    print_success "Database migrations completed!"
}

# Run database seed
run_seed() {
    print_status "Running database migrations..."
    cd apps/server
    pnpm run db:seed
    cd ../..
    print_success "Database seed completed!"
}

# Main execution
main() {
    printf "${GREEN}🚀 Initializing Turborepo Fullstack Boilerplate${NC}\n"
    echo "=================================================="
    
    check_requirements
    collect_user_input
    replace_placeholders
    create_env_files
    install_dependencies
    start_docker_services
    wait_for_database
    init_db
    run_seed

    echo ""
    printf "${GREEN}🎉 Setup completed successfully!${NC}\n"
    echo ""
    echo "Next steps:"
    printf "1. Start the development server: ${BLUE}pnpm turbo dev${NC}\n"
    printf "2. Open your browser to: ${BLUE}http://localhost:3000${NC}\n"
    printf "3. API documentation: ${BLUE}http://localhost:3001/api${NC}\n"
    echo ""
    echo "Happy coding! 🚀"
}

# Run main function
main "$@" 