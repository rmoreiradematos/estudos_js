export default class Shipment {
  update({ id, userName }) {
    // importante lembrar que o [update] é responsável por gerenciar seus erros/exceptions
    // nao se deve ter await no notify porque a responsabilidade do notify é apenas emitir eventos
    // só notificar todo mundo
    console.log(`[${id}]: [shipment] will pack the user's to order to [${userName}]`)
  }
}