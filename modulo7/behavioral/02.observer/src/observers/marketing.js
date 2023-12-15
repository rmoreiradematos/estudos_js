export default class Marketing {
  update({ id, userName }) {
    // importante lembrar que o [update] é responsável por gerenciar seus erros/exceptions
    // nao se deve ter await no notify porque a responsabilidade do notify é apenas emitir eventos
    // só notificar todo mundo
    console.log(`[${id}]: [marketing] will send a welcome to [${userName}]`)
  }
}