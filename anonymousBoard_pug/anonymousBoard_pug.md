# Anonymous Board pug
퍼그 사용 및 복습
___
## Anonymous Board 과정

### 프로젝트 세팅
1. npm init -y
2. gitignore 추가 :  
  VScode에서 ctrl+Shift+p > add gitignore > node

### Express 앱 세팅
3. npm install --save express
4. 템플릿 엔진 설정
5. npm script 추가 & package.json에 "start": "node server.js" 추가
6. static 라우트 설정
7. 템플릿, CSS 파일 추가


___
## pug 사용법



### each & if else 함수  

>each 인자 in 순환할 객체  
함수를 사용 할 때에는 앞에 - 를 붙여 사용한다. {}는 생략
순환하는 객체의 값을 사용할 때에는 =을 붙여 변수 처럼 넣어 사용한다.

```jade
each item in data
  .list.clearfix
    - if(item.num>10)
      .list-num= '0'+item.num
    - else
      .list-num= item.num
```

___
## 일정
<2017.09.03> 프로젝트, 앱 셋팅 && pug 사용
<2017.09.04> main CSS  적용 완료!





