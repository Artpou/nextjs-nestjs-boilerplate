"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "@workspace/ui/components/input";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Play, Search, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Loading } from "@workspace/ui/components/loading";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

import useAPI from "@/hooks/useAPI";

const DEBOUNCE_TIME = 1000;
const STALE_TIME = 1000 * 60 * 5;

export const SearchArtist = () => {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"artist" | "album" | "track">("album");
  const [open, setOpen] = useState(false);
  const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);
  const { GET } = useAPI();
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldShowResults = search.length > 2;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedSearch, type],
    queryFn: async () => {
      if (!debouncedSearch) return { items: [] };

      const { data } = await GET("/search", {
        params: {
          query: { search: debouncedSearch, type },
        },
      });

      return data || { items: [] };
    },
    enabled: shouldShowResults,
    staleTime: STALE_TIME,
  });

  const items = data?.items || [];

  return (
    <div className="mx-auto w-full max-w-xl" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          className="pl-9"
          placeholder="Search artists..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />

        {open && (
          <div className="absolute inset-x-0 top-full z-50 mt-1 gap-2 overflow-hidden rounded-md border bg-popover shadow-md">
            <Tabs
              className="w-full"
              value={type}
              onValueChange={(value) =>
                setType(value as "artist" | "album" | "track")
              }
            >
              <TabsList className="w-full">
                <TabsTrigger className="w-full" value="album">
                  {t("common.albums")}
                </TabsTrigger>
                <TabsTrigger className="w-full" value="track">
                  {t("common.tracks")}
                </TabsTrigger>
                <TabsTrigger className="w-full" value="artist">
                  {t("common.artists")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <ScrollArea>
              <div className="max-h-[300px] min-h-32">
                {!shouldShowResults && <></>}
                {shouldShowResults && isLoading && (
                  <div className="flex items-center justify-center gap-2 p-4 text-muted-foreground">
                    <Loading />
                    <span>{t("common.loading")}</span>
                  </div>
                )}
                {shouldShowResults && !isLoading && items?.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">
                    {t("common.no_results")}
                  </div>
                )}
                {shouldShowResults &&
                  !isLoading &&
                  items?.map((item) => {
                    const image =
                      item.images?.[0]?.url || item.album?.images?.[0]?.url;

                    const artists = item.artists?.map((artist) => artist.name);
                    const year = item?.release_date
                      ? new Date(item.release_date).getFullYear().toString()
                      : null;

                    return (
                      <div
                        key={item.id}
                        className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-4 hover:bg-accent"
                      >
                        <div className="flex items-center gap-4">
                          {!!image && (
                            <Image
                              src={image}
                              alt={item.name || "Artist"}
                              className="rounded-full object-cover"
                              height={40}
                              width={40}
                            />
                          )}
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="text-sm text-muted-foreground">
                              {artists?.map((artist, idx) => (
                                <span key={idx}>
                                  <Link
                                    href={`/artist/${item.id}`}
                                    className="text-sm text-muted-foreground hover:underline"
                                  >
                                    {artist}
                                  </Link>
                                  {idx < artists.length - 1 ? ", " : ""}
                                </span>
                              ))}
                              {!!artists && !!year && ` - ${year}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline">
                            <Star />
                          </Button>
                          <Button size="icon">
                            <Play />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};
