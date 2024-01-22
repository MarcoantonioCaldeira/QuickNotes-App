export function formatData(dataString: string): string {
    const data = new Date(dataString);
    const day = String(data.getDate()).padStart(2, '0');
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const year = data.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatMoney(value: number): string {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  
    return formattedValue;
  }