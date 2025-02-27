import { ReactNode } from "react";

declare module 'react' {
  interface ImgHTMLAttributes<T> extends React.HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}
declare global {

  interface Window {
    dataLayer?: any;
  }

  interface ButtonProps {
    primary?: boolean;
    backgroundColor?: string;
    size?: 'small' | 'medium' | 'large';
    label: string;
    onClick?: () => void;
  }

  interface ISkeletonElement {
    blockClass?: string
    classes?: string
    width: string
    height: string
    children?: ReactNode
    functionAfterView?: () => void
  }

  interface IAccordionButton {
    title: string
    titleStrong?: string
    showIcons?: boolean
    blockClass: string
    children: JSX.Element | ReactChildren
    defaultIsOpen?: boolean
    dataLayerGa3Props?: IDataLayerGA3Props
    dataLayerGa4Props?: IDataLayerGA4Props
  }

  interface IDataLayerGA3Props {
    category: string
    action: string
    label: string
  }

  interface IDataLayerGA4Props {
    eventName: string
    pageType?: string
    userAction: string
    contentName: string
    contentCategory: string
    contentLabel: string | number
    contentValue: string | number
    contentDescription: string
    onlyValidate?: [string] | [],
    notValidate?: [string] | []
  }
  interface IDataLayerGa4 {
    eventName: string
    pageType?: string
    userAction: string
    contentName: string
    contentCategory: string
    contentLabel: string | number
    contentValue: string | number
    contentDescription: string
    onlyValidate?: [string] | [],
    notValidate?: [string] | []
  }

}
