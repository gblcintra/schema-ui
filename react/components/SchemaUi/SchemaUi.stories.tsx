import React from 'react';
import SchemaUi, { SchemaUiProps } from './';
// import { SchemaUiItemProps } from './schema';

export default {
  title: 'Componente/SchemaUi',
  component: SchemaUi,
  argTypes: {
    titleItem: { control: 'text' },
    activeItem: { control: 'boolean' },
    textProps: { control: 'object' },
    dataProps: { control: 'object' },
    selectProps: { control: 'object' },
    restrictProps: { control: 'object' },
    arrayItem: { control: 'object' },
    uploadItem: { control: 'text' },
    uploadFile: { control: 'text' },
    showMoreConfig: { control: 'boolean' }
  },
};

const Template = (args: SchemaUiProps) => <SchemaUi {...args} />;

export const Default = Template.bind({});
Default.args = {
  titleItem: 'Configuração do Schema',
  activeItem: true,
  textProps: {
    titleItem: 'Texto Exemplo',
    passwordItem: 'senha123',
    descriptionItem: 'Uma breve descrição.',
  },
  dataProps: {
    dataTimeItem: '2025-01-01T00:00:00',
    dataItem: '2025-01-01',
  },
  selectProps: {
    selectItem: '#000',
    colorItem: '#ff0000',
    radioItem: 'Opção 1',
    reference: 'option #0',
  },
  restrictProps: {
    secret: 'supersecreta',
    disabledItem: 'desabilitado',
    readonlyItem: 'somenteLeitura',
    readonlyItem2: 'somenteLeitura2',
  },
  arrayItem: [
    { __editorItemTitle: 'Item 1', title: 'Item 1' },
    { __editorItemTitle: 'Item 2', title: 'Item 2' },
  ],
  uploadItem: 'url-da-imagem.jpg',
  uploadFile: 'documento.pdf',
  showMoreConfig: true,
};

export const NoActiveItem = Template.bind({});
NoActiveItem.args = {
  titleItem: 'Configuração do Schema',
  activeItem: false,
  textProps: {
    titleItem: 'Texto Exemplo',
  },
  dataProps: {
    dataTimeItem: '2025-01-01T00:00:00',
  },
};

export const CustomConfig = Template.bind({});
CustomConfig.args = {
  titleItem: 'Configuração Customizada',
  activeItem: true,
  textProps: {
    titleItem: 'Texto Customizado',
    passwordItem: 'senhaSecreta!',
  },
  selectProps: {
    selectItem: '#fff',
    colorItem: '#00ff00',
    radioItem: 'Opção 2',
  },
  restrictProps: {
    secret: 'oculto',
    readonlyItem: 'somenteLeitura3',
  },
};
