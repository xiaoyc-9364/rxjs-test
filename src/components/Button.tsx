import { useEffect, useState } from 'react';
import { fromEvent, scan, throttleTime, map } from 'rxjs';

const Button = () => {
  const [btnClicked1, setBtnClicked1] = useState('');

  useEffect(() => {
    const button = document.querySelector('#btn1')!;
    fromEvent(button, 'click').subscribe(() => setBtnClicked1(`btn1 Clicked`));
  }, []);

  const [btnClicked2, setBtnClicked2] = useState('');
  useEffect(() => {
    const button = document.querySelector('#btn2')!;
    fromEvent(button, 'click')
      .pipe(scan((count) => count + 1, 0))
      .subscribe((count) => setBtnClicked2(`btn2 Clicked ${count} times`));
  }, []);

  const [btnClicked3, setBtnClicked3] = useState('');

  useEffect(() => {
    const button = document.querySelector('#btn3')!;
    fromEvent(button, 'click')
      .pipe(
        throttleTime(1000),
        scan((count) => count + 1, 0)
      )
      .subscribe((count) =>
        setBtnClicked3(`btn3  throttleTime Clicked ${count} times`)
      );
  }, []);
  const [btnClicked4, setBtnClicked4] = useState('');

  useEffect(() => {
    fromEvent(document, 'click')
      .pipe(
        throttleTime(1000),
        map((event) => event.clientX),
        scan((count, clientX) => count + clientX, 0)
      )
      .subscribe((count) =>
        setBtnClicked4(`document Clicked ${count} times`)
      );
  }, []);

  return (
    <>
      <div>
        <button id="btn1">Button1</button>
        {btnClicked1}
      </div>
      <div>
        <button id="btn2">Button2</button>
        {btnClicked2}
      </div>
      <div>
        <button id="btn3">Button3</button>
        {btnClicked3}
      </div>
      <div>{btnClicked4}</div>
    </>
  );
};

export default Button;
