class CategoryModel {
    id?: number;
    name: string;

    constructor(name: string, id?: number) {
        this.name = name;
        this.id = id;
    }
}

export default CategoryModel;