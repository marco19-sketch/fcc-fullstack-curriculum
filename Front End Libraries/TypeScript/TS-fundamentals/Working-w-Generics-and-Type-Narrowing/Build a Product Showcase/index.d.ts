interface Item {
    type: "book" | "electronics" | "clothing";
    id: string;
    price: number;
}
interface Book extends Item {
    type: "book";
    title?: string;
    author?: string;
}
interface Electronics extends Item {
    type: "electronics";
    item?: string;
    model?: string;
    warranty?: number;
}
interface Clothing extends Item {
    type: "clothing";
    item?: string;
    brand?: string;
    size?: "S" | "M" | "L";
}
type Product = Book | Electronics | Clothing;
declare class Collection<T> {
    private items;
    constructor(items: Array<T>);
    getAll(): T[];
    filter(callback: (element: T) => boolean): Array<T>;
}
declare const isValidItem: (item: unknown) => item is Item;
declare const isValidProduct: (item: unknown) => item is Product;
declare const renderProduct: (product: Product) => string;
declare const products: Collection<Product>;
declare const showProducts: (type?: "book" | "electronics" | "clothing") => void;
declare const btns: Element | null;
//# sourceMappingURL=index.d.ts.map