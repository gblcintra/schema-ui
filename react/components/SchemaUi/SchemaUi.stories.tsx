import React from 'react';
import SchemaUi, { SchemaUiProps } from './';
import { SchemaPropsDefault } from './schema';
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
Default.args = SchemaPropsDefault

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
