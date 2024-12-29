/* eslint-disable prettier/prettier */
export function mascararCNPJ(cnpj: string): string {
  let formatted = '';
  if (cnpj.length === 3) {
    const temp = cnpj.replace('.', '').replace('.', '').replace('/', '');
    formatted = temp.replace(/(\d{2})(\d{1})/g, '$1.$2');
  } else if (cnpj.length === 7) {
    const temp = cnpj.replace('.', '').replace('.', '').replace('/', '');
    formatted = temp.replace(/(\d{2})(\d{2,3})(\d{0,1})/g, '$1.$2.$3');
  } else if (cnpj.length === 11) {
    const temp = cnpj.replace('.', '').replace('.', '').replace('/', '');
    formatted = temp.replace(/(\d{2})(\d{3})(\d{3})(\d{0,1})/g, '$1.$2.$3/$4');
  } else if (cnpj.length === 16) {
    const temp = cnpj
      .replace('.', '')
      .replace('.', '')
      .replace('/', '')
      .replace('-', '');

    formatted = temp.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,1})/g,
      '$1.$2.$3/$4-$5',
    );
  } else if (cnpj.length === 18) {
    const temp = cnpj
      .replace('.', '')
      .replace('.', '')
      .replace('/', '')
      .replace('-', '');
    formatted = temp.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      '$1.$2.$3/$4-$5',
    );
  } else {
    formatted = cnpj;
  }
  return formatted;
}

export function mascararTelefone(telefone: string): string {
  let formatted = '';
  if (telefone.length === 1) {
    formatted = telefone.replace(/(\w{1})/g, '($1');
  } else if (telefone.length === 4) {
    const temp = telefone.replace('(', '').replace(')', '');
    formatted = temp.replace(/(\d{2})/g, '($1)');
  } else if (telefone.length === 10) {
    const temp = telefone.replace('(', '').replace(')', '').replace('-', '');
    formatted = temp.replace(/(\d{2})(\d{5})(\d{0,1})/g, '($1)$2-$3');
  } else {
    formatted = telefone;
  }
  return formatted;
}

export function mascararCEP(cep: string): string {
  let formatted = '';
  if (cep.length === 6) {
    formatted = cep.replace(/(\d{5})(\d{1})/g, '$1-$2');
  } else {
    formatted = cep;
  }
  return formatted;
}

export function mascararCPF(cpf: string): string {
  let formatted = '';
  if (cpf.length === 4) {
    const temp = cpf.replace('.', '').replace('.', '').replace('-', '');
    formatted = temp.replace(/(\d{3})(\d{0,1})/g, '$1.$2');
  } else if (cpf.length === 8) {
    const temp = cpf.replace('.', '').replace('.', '').replace('-', '');
    formatted = temp.replace(/(\d{3})(\d{3})(\d{0,1})/g, '$1.$2.$3');
  } else if (cpf.length === 12) {
    const temp = cpf.replace('.', '').replace('.', '').replace('-', '');
    formatted = temp.replace(/(\d{3})(\d{3})(\d{3})(\d{0,1})/g, '$1.$2.$3-$4');
  } else {
    formatted = cpf;
  }
  return formatted;
}

export function mascararData(data: string): string {
  let formatted = '';
  if (data.length === 3) {
    const temp = data.replace('/', '').replace('/', '');
    formatted = temp.replace(/(\d{2})(\d{0,1})/g, '$1/$2');
  } else if (data.length === 6) {
    const temp = data.replace('/', '').replace('/', '');
    formatted = temp.replace(/(\d{2})(\d{2})(\d{0,1})/g, '$1/$2/$3');
  } else {
    formatted = data;
  }
  return formatted;
}
