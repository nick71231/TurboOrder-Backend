const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const printOrder = (data) => {
  const device = new escpos.USB();
  const options = { encoding: "CP437" }; // pode testar CP850 também
  const printer = new escpos.Printer(device, options);

  const cliente = data.cliente;
  const produtos = data.produtos;

  device.open(() => {
    printer
      .align('CT')
      .style('B')
      .size(1, 1)
      .text('PEDIDO DE RESTAURANTE')
      .style('NORMAL')
      .text('---------------------------')
      .align('LT');

    // Cliente
    printer.text(`Cliente: ${cliente.cli_nome} ${cliente.cli_sobrenome}`);
    printer.text(`Telefone: ${cliente.con_telefone}`);
    printer.text(`Endereço: ${cliente.cli_rua}, Nº ${cliente.cli_numero}`);
    printer.text(`Bairro: ${cliente.cli_bairro}`);
    printer.text(`Cidade: ${cliente.cli_cidade}`);
    printer.text(`Complemento: ${cliente.cli_complemento}`);
    printer.text('---------------------------');

    // Produtos
    printer.text('Itens:');
    Object.entries(produtos).forEach(([key, item]) => {
      printer.text(`- ${item.pro_tipo}: ${item.pro_nome}`);
    });

    printer
      .text('---------------------------')
      .feed(3)
      .cut()
      .close();
  });
};

module.exports = { printOrder };
