const studentStates = [
  {status: 0, description: 'Ausente'},
  {status: 1, description: 'Em Progresso'},
  {status: 2, description: 'Não Corrigido'},
  {status: 3, description: 'Corrigido'}
]

export const statusStudent = (status) => {
  return studentStates.find(r => r.status === status).description
}
