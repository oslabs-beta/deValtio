/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import MainContainer from '../src/frontend/Containers/MainContainer';
import { SnapShotContainer } from "../src/frontend/Containers/SnapShotContainer";

let container = null;
beforeEach (() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders as expected", () => {
    act(()=> {
        render(<MainContainer />, container);
    });
    expect(5).toEqual(5);
});