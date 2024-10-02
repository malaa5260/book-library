export interface Book {
    key: string;
    title: string;
    cover_id: string | null; // cover_id might be null
    authors: { key: string; name: string }[];
    first_publish_year: number;
    number_of_pages: number;
    edition_count: number;
}
