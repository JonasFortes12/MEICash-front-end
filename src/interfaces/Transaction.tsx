interface Transaction {
    id: string,
    title: string,
    timestamp: string,
    type: string,
    value: number,
    categoryName: string,
    categoryColor: string, 
    description: string;
}

export default Transaction