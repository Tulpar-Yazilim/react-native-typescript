import { Component, FunctionComponent, ReactElement, ReactInstance, ReactNode } from "react";

export interface IScreen {
    title?: string,
    name: string,
    component: FunctionComponent,
    headerShown?: boolean,
}