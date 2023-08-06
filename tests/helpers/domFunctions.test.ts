import {
  getElementLeft, getElementTop
} from "../../src/helpers/domFunctions";

describe("Element position", ()=>{
  let elem: HTMLElement;
  beforeAll(()=>{
    const mockElem = (values: {l:number,t:number}) =>{
      const elem = document.createElement('div');
      jest.spyOn(elem, 'offsetLeft', 'get').mockReturnValue(values.l);
      jest.spyOn(elem, 'offsetTop', 'get').mockReturnValue(values.t);
      return elem;
    }
    const e1 = mockElem({l:10,t:15});
    document.body.appendChild(e1);

    elem = mockElem({l:20,t:28});
    e1.appendChild(elem);
    jest.spyOn(elem, 'offsetParent', 'get').mockReturnValue(e1);
  });

  it("Should get combined offsetLeft", ()=>{
    const res = getElementLeft(elem);
    expect(res).toBe(30);
  });

  it("Should get combined offsetHeight", ()=>{
    const res = getElementTop(elem);
    expect(res).toBe(43);
  });
})