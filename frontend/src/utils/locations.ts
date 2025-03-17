export function sortStatesByName(state: { nome: string; cigla: string; id: number }[]) {
    return state.sort((a, b) => {
      if (a.nome < b.nome) return -1;
      if (a.nome > b.nome) return 1;
      return 0;
    });
}

export function formatCEP(cep: string): string {
    const cleanedCEP = cep.replace(/\D/g, '');
  
    if (cleanedCEP.length <= 5) {
      return cleanedCEP;
    } else {
      return `${cleanedCEP.slice(0, 5)}-${cleanedCEP.slice(5, 8)}`;
    }
}