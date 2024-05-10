import { AuthorsResponse } from "./authors-response";
import { SubjectsResponse } from "./subject-response";

export interface BooksResponse {
    title: string;
    value: number;
    publisher: string;
    edition: number;
    year: string;
    createdAt: string;
    updatedAt: string;
    currency: string;
    authors: AuthorsResponse[];
    subjects: SubjectsResponse[];
    id: number;
}