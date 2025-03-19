"use client"
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import HeaderImperio from "@/components/Header";
import Card from "@/components/Card";
import TextInput from "@/components/TextInput";
import DateInput from "@/components/DateInput";
import FormattedInput from "@/components/FormattedTextInput";
import { formatCPF, validateCPF, formatPhone, formatOnlyNumber, formatOnlyNumberNoLimit, formatCNPJ, validateCNPJ } from "@/utils/number"
import { validateDOB } from "@/utils/date"
import ComboBox from '@/components/ComboInput';
import { sortStatesByName, formatCEP } from '@/utils/locations'
import stateList from "./estados.json"
import TextBox from '@/components/TextBox';

export default function Home() {
  const [cpf, setCpf] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [logradouro, setLogradouro] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedCidade, setSelectedCidade] = useState('');
  const [selectedBairro, setSelectedBairro] = useState('');

  const [cidades, setCidades] = useState<{ value: string; label: string }[]>([]);

  const [cep, setCEP] = useState('');
  const [number, setNumber] = useState('');

  const [noteNum, setNoteNum] = useState('');
  const [dateOfPurchase, setDateOfPurchase] = useState('');
  const [cnpj, setCnpj] = useState('');

  const [mae, setMae] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isInvalid, setIsInvalid] = useState<Record<string, boolean>>({
    nome: false,
    data_nascimento: false,
    cpf: false,
    telefone: false,
    email: false,
    logradouro: false,
    bairro: false,
    numero: false,
    cidade: false,
    estado: false,
    cep: false,
    numero_nota: false,
    data_compra: false,
    cnpj_empresa: false,
    resposta: false,
  });

  useEffect(() => {
    if (selectedEstado) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedEstado}/municipios`)
        .then((response) => response.json())
        .then((data) => {
          const cidadesFormatadas = data.map((cidade: { id: number, nome: string }) => ({
            value: cidade.id,
            label: cidade.nome,
          }));
          setCidades(cidadesFormatadas);
        });
    } else {
      setCidades([]);
    }
  }, [selectedEstado]);

  const sorted_list = sortStatesByName(stateList);
  const state_list = sorted_list.map((estado) => ({
    value: estado.id.toString(),
    label: `${estado.nome} (${estado.cigla})`,
  }));

  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();

    const formulario = {
        nome: name,
        data_nascimento: dob,
        cpf,
        telefone: phone,
        email,
        logradouro: logradouro,
        bairro: selectedBairro,
        numero: number,
        cidade: selectedCidade,
        estado: selectedEstado,
        cep,
        numero_nota: noteNum,
        cnpj_empresa: cnpj,
        data_compra: dateOfPurchase,
        resposta: mae,
    };

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.errors) {
          setErrors(data.errors);

          const newInvalidState: Record<string, boolean> = {};
          Object.keys(data.errors).forEach((campo) => {
            newInvalidState[campo] = true;
          });
          setIsInvalid(newInvalidState);
        }
        if (data.error) {
          alert(data.error);
        }
      } else {
        alert('Formulário enviado com sucesso!');
        setCpf('');
        setDob('');
        setPhone('');
        setName('');
        setEmail('');
        setLogradouro('');
        setSelectedEstado('');
        setSelectedCidade('');
        setSelectedBairro('');
        setCEP('');
        setNumber('');
        setNoteNum('');
        setDateOfPurchase('');
        setCnpj('');
        setMae('');
        setErrors({});
        setIsInvalid({});
      }
    } catch (error) {
      console.error(error);
      alert(`Erro ao enviar o formulário.`);
    }
  };

  return (
    <div className={styles.formpage}>
      <HeaderImperio />
      <main className={styles.formbody}>
        <form className={styles.form} onSubmit={enviarFormulario}>
          <Card>
            <h3 className={styles.title}>Sua Mãe Merece um Império!</h3>
            <p className={styles.paragraph}>Neste Dia das Mães, queremos celebrar todas as mães com um presente especial! Se você fez compras acima de R$100,00 em nossas lojas entre <b>01/05/2025</b> e <b>31/05/2025</b>, cadastre-se aqui e concorra a um prêmio em dinheiro para presentear a mulher mais importante da sua vida.</p>
            <p className={styles.paragraph}>Preencha o formulário abaixo com seus dados pessoais, informações da nota fiscal e nos conte <b>por que sua mãe merece um Império</b>. Não perca essa chance de homenagear quem sempre esteve ao seu lado!</p>
            <p className={styles.paragraph}><i>Participe e boa sorte!</i></p>
          </Card>
          <Card>
            <h4 className={styles.title2}>Dados Pessoais</h4>
            <div className={styles.inputwraper}>
              <DateInput
                id="dob"
                title="Data de Nascimento"
                invalid_message={errors.data_nascimento || "Data Inválida"}
                value={dob}
                validate={validateDOB}
                onChange={(value) => setDob(value)}
                isInvalid={isInvalid.data_nascimento}
              />
              <FormattedInput
                id="cpf"
                title="CPF"
                hint="Digite seu CPF"
                value={cpf}
                onChange={(value) => setCpf(value)}
                format={formatCPF}
                validate={validateCPF}
                invalid_message={errors.cpf || "CPF inválido"}
                isInvalid={isInvalid.cpf}
              />
            </div>
            <div className={styles.inputwraper}>
              <TextInput
                id="email"
                type="email"
                title="Email"
                hint="exemplo@email.com"
                invalid_message={errors.email || "Preencha esse campo"}
                value={email}
                onChange={(value) => setEmail(value)}
                isInvalid={isInvalid.email}
              />
              <FormattedInput
                id="phone"
                title="Telefone"
                hint="Digite seu telefone"
                value={phone}
                onChange={(value) => setPhone(value)}
                format={formatPhone}
                invalid_message={errors.telefone || "Telefone inválido"}
                isInvalid={isInvalid.telefone}
              />
            </div>
            <div className={styles.inputwraper}>
              <TextInput
                id="name"
                title="Nome"
                hint="Jhon Doe"
                invalid_message={errors.nome || "Preencha esse campo"}
                value={name}
                onChange={setName}
                isInvalid={isInvalid.nome}
              />
            </div>
          </Card>
          <Card>
            <h4 className={styles.title2}>Endereço</h4>
            <div className={styles.inputwraper}>
              <FormattedInput
                id="cep"
                title="CEP"
                hint="Digite seu CEP"
                value={cep}
                onChange={(value) => setCEP(value)}
                format={formatCEP}
                invalid_message={errors.cep || "CEP inválido"}
                isInvalid={isInvalid.cep}
              />
              <ComboBox
                id="state"
                title="Estado"
                hint="Selecione seu estado"
                options={state_list}
                value={selectedEstado}
                onChange={(value) => {
                  setSelectedEstado(value);
                  setSelectedCidade('');
                  setSelectedBairro('');
                }}
                isInvalid={isInvalid.estado}
              />
              <ComboBox
                id="city"
                title="Cidade"
                hint="Selecione sua cidade"
                options={cidades}
                value={selectedCidade}
                onChange={(value) => {
                  setSelectedCidade(value);
                  setSelectedBairro('');
                }}
                disabled={!selectedEstado}
                isInvalid={isInvalid.cidade}
              />
              <TextInput
                id="bairro"
                title="Bairro"
                hint="Insira seu Bairro"
                invalid_message={errors.bairro || "Preencha esse campo"}
                value={selectedBairro}
                onChange={setSelectedBairro}
                isInvalid={isInvalid.bairro}
              />
            </div>
            <div className={styles.inputwraper}>
              <TextInput
                id="logradouro"
                title="Logradouro"
                hint="R. Exemplo"
                invalid_message={errors.logradouro || "Preencha esse campo"}
                value={logradouro}
                onChange={setLogradouro}
                isInvalid={isInvalid.logradouro}
              />
              <div className={styles.inputwraper2}>
                <FormattedInput
                  id="number"
                  title="Número"
                  hint="000"
                  value={number}
                  onChange={(value) => setNumber(value)}
                  format={formatOnlyNumber}
                  invalid_message={errors.numero || "Preencha esse campo"}
                  isInvalid={isInvalid.numero}
                />
              </div>
            </div>
          </Card>
          <Card>
            <h4 className={styles.title2}>Dados da Nota</h4>
            <div className={styles.inputwraper}>
              <FormattedInput
                id="numNote"
                title="Número da Nota"
                hint="Insira no número da sua nota"
                value={noteNum}
                onChange={(value) => setNoteNum(value)}
                format={formatOnlyNumberNoLimit}
                invalid_message={errors.numero_nota || "Preencha esse campo"}
                isInvalid={isInvalid.numero_nota}
              />
            </div>
            <div className={styles.inputwraper}>
              <DateInput
                id="dateOfPurchase"
                title="Data da Compra"
                invalid_message={errors.data_compra || "Data Inválida"}
                value={dateOfPurchase}
                onChange={(value) => setDateOfPurchase(value)}
                isInvalid={isInvalid.data_compra}
                min="2025-05-01"
                max="2025-05-31"
              />
              <FormattedInput
                id="cnpj"
                title="CNPJ da Empresa de Faturamento"
                hint="XX.XXX.XXX/0001-XX"
                value={cnpj}
                onChange={(value) => setCnpj(value)}
                format={formatCNPJ}
                validate={validateCNPJ}
                invalid_message={errors.cnpj_empresa || "CNPJ Inválido"}
                isInvalid={isInvalid.cnpj_empresa}
              />
            </div>
          </Card>
          <Card>
            <h4 className={styles.title2}>Para Finalizar</h4>
            <div className={styles.inputwraper}>
              <TextBox
                id="mae"
                title="Por que sua mãe merece um Império?"
                hint="Insira sua resposta..."
                value={mae}
                onChange={(value) => setMae(value)}
                invalid_message={errors.resposta || "Preencha esse campo"}
                rows={10}
                isInvalid={isInvalid.resposta}
              />
            </div>
          </Card>
          <button type="submit" className={styles.sendBtn}>Enviar <i className="bi bi-send"></i></button>
        </form>
      </main>
    </div>
  );
}