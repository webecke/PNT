// noinspection JSVoidFunctionReturnValueUsed

import { render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it } from "@jest/globals";
import Link from "next/link";
import { mock, instance, verify, capture, when, anything } from "@typestrong/ts-mockito";
import "@testing-library/jest-dom";

describe("Our Jest setup", () => {
  let the_beforeEach_method_hasRun = false;
  beforeEach(() => {
    the_beforeEach_method_hasRun = true;
  })

  it("passes on an empty test", () => {
  });

  const test_of_beforeEach_method = () => {
    expect(the_beforeEach_method_hasRun).toBeTruthy();
    the_beforeEach_method_hasRun = false;
  }

  it("runs beforeEach() before this test (1 of 2)", test_of_beforeEach_method);

  it("runs beforeEach() before this test (2 of 2)", test_of_beforeEach_method);

  it("expects true to be truthy", () => {
    expect(true).toBeTruthy();
  });

  it("expects false not to be truthy", () => {
    expect(false).not.toBeTruthy();
  });

  it("expects an object toEqual() an identical object", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(obj1).toEqual(obj2);
  });

  it("expects an object not toBe() an identical object", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(obj1).not.toBe(obj2);
  });

  it("expects an object toBe() the same as another reference to it", () => {
    const objVar1 = { a: 1, b: 2 };
    const objVar2 = objVar1;
    expect(objVar1).toBe(objVar2);
  });

  it("expects a number toBe() that same number", () => {
    expect(3).toBe(3);
  });

  it("expects a string toBe() that same string", () => {
    expect("hello").toBe("hello");
  });

  it("expects an object toBe() itself", () => {
    const obj = { a: 1, b: 2 };
    expect(obj).toBe(obj);
  });

  it("can expect an error to be thrown", () => {
    expect(() => {
      throw new Error("A test error");
    }).toThrow();
  });
});

describe("Our React Testing Library setup", () => {
  it("can render an empty div", () => {
    render(<div />);
  });

  it("can findByRole() a Link element", async () => {
    render(<Link href="/" />);
    const linkElement = await screen.findByRole("link", {});
    expect(linkElement).toBeTruthy();
  });

  it("can expect a button toBeEnabled()", async () => {
    render(<button />);
    const elem = await screen.findByRole("button", {});
    expect(elem).toBeEnabled();
  });
});

describe("Our mockito setup", () => {
  it("can verify a method was called", () => {
    type MyType = { myFunc: () => void };
    const objMock: MyType = mock<MyType>();
    const obj: MyType = instance(objMock);

    obj.myFunc();

    verify(objMock.myFunc()).once();
  });

  it("can verify a method was called with a specific argument", () => {
    type MyType = { myFunc: (x: number) => void };
    const objMock: MyType = mock<MyType>();
    const obj: MyType = instance(objMock);

    obj.myFunc(3);

    verify(objMock.myFunc(3)).once();
  });

  it("can verify a method was called with any argument", () => {
    type MyType = { myFunc: (x: number) => void };
    const objMock: MyType = mock<MyType>();
    const obj: MyType = instance(objMock);

    obj.myFunc(3);

    verify(objMock.myFunc(anything())).once();
  });

  it("can capture a method call's arguments", () => {
    type MyType = { myFunc: (x: number, y: number) => void };
    const objMock: MyType = mock<MyType>();
    const obj: MyType = instance(objMock);

    obj.myFunc(3, 5);

    const [firstArg, secondArg] = capture(objMock.myFunc).last();
    expect(firstArg).toBe(3);
    expect(secondArg).toBe(5);
  });

  it("can mock a method return value", () => {
    type MyType = { myFunc: () => number };
    const objMock: MyType = mock<MyType>();
    const obj: MyType = instance(objMock);

    when(objMock.myFunc()).thenReturn(5);

    expect(obj.myFunc()).toBe(5);
  });

  it("can mock a method to throw an error", () => {
    type MyType = { myFunc: () => number };
    const objMock: MyType = mock<MyType>();
    const obj: MyType = instance(objMock);
    const err = new Error("A test error");

    when(objMock.myFunc()).thenThrow(err);

    expect(() => obj.myFunc()).toThrow(err);
  });
});
