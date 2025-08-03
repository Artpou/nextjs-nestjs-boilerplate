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
# Database
DATABASE_URL=postgresql://developer:test@localhost:5432/doremi

# JWT
JWT_SECRET=${JWT_SECRET}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}

# Server
PORT=3001
NODE_ENV=development

# Redis (optional)
REDIS_URL=redis://localhost:6379
EOF
        print_success "Created apps/server/.env with generated JWT secrets"
    else
        print_warning "apps/server/.env already exists, skipping..."
    fi
    
    # Web .env
    if [ ! -f "apps/web/.env" ]; then
        # Generate a secure NextAuth secret using the official command
        NEXTAUTH_SECRET=$(npx auth secret)
        
        cat > apps/web/.env << EOF
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# API
NEXT_PUBLIC_API_URL=http://localhost:3001

# Database (for NextAuth)
DATABASE_URL=postgresql://developer:test@localhost:5432/doremi
EOF
        print_success "Created apps/web/.env with generated NextAuth secret"
    else
        print_warning "apps/web/.env already exists, skipping..."
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
        if docker exec db pg_isready -U developer -d doremi &> /dev/null; then
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

# Generate OpenAPI schema
generate_schema() {
    print_status "Generating OpenAPI schema..."
    cd packages/openapi
    pnpm run generate
    cd ../..
    print_success "OpenAPI schema generated!"
}

# Main execution
main() {
    printf "${GREEN}🚀 Initializing Turborepo Fullstack Boilerplate${NC}\n"
    echo "=================================================="
    
    check_requirements
    create_env_files
    install_dependencies
    start_docker_services
    wait_for_database
    init_db
    run_seed
    generate_schema

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