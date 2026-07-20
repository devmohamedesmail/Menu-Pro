import useImport from "@/hooks/use-import";
import { Search, UtensilsCrossed } from "lucide-react";

export default function MenuHero({
    store,
    table,
}: {
    store: any;
    table: any;
}) {
    const { t } = useImport();

    const banner =
        store?.banner ||
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80";

    return (
        <header
            className="relative flex min-h-[40vh] lg:min-h-screen items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${banner})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center text-white">
                {/* Logo */}
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 backdrop-blur">
                    {store?.image ? (
                        <img
                            src={store.image}
                            alt={store.name}
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : (
                        <UtensilsCrossed size={40} />
                    )}
                </div>

                {/* Welcome */}
                <p className="mb-2 text-sm uppercase tracking-[0.35em] text-orange-300">
                    {t("menu.welcome-title")}
                </p>

                <h1 className="text-4xl font-extrabold md:text-6xl">
                    {store?.name}
                </h1>

                {store?.description && (
                    <p className="mt-5 max-w-2xl text-lg text-white/80">
                        {store.description}
                    </p>
                )}

                {table && (
                    <div className="mt-8 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur">
                        <span className="text-white/80">
                            {t("menu.on-table")}
                        </span>

                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white">
                            {table}
                        </span>
                    </div>
                )}

                {/* Search */}
                <div className="mt-12 w-full max-w-2xl">
                    <div className="flex overflow-hidden rounded-full bg-white shadow-2xl">
                        <input
                            placeholder={t("menu.search_for_meal")}
                            className="h-14 flex-1 px-6 text-gray-700 outline-none"
                        />

                        <button className="flex h-14 w-16 items-center justify-center bg-primary transition hover:brightness-110">
                            <Search className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}