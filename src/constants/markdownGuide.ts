export const MARKDOWN_GUIDE_PART_1 = `
<strong>Header</strong><br/>
- # H1 Header<br/>
- ## H2 Header<br/>
- ### H3 Header<br/><br/>

<strong>Text Style 1</strong><br/>
- <b>굵은 글씨</b> → \`**텍스트**\` 또는 Ctrl/Cmd + B<br/>
- <i>기울임</i> → \`*텍스트*\` 또는 Ctrl/Cmd + I<br/>
- <s>취소선</s> → \`~~텍스트~~\` 또는 Ctrl/Cmd + D<br/>
- <u>밑줄</u> → \`<u>텍스트</u>\` 또는 Ctrl/Cmd + U<br/><br/>

<strong>Text Style 2</strong><br/>
- \`코드\` (inline) → 백틱(\`)으로 감싸기<br/>
- 코드 블럭 -><br/>

<pre><code>
\`\`\`
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`
</code></pre><br/>
`;

export const MARKDOWN_GUIDE_PART_2 = `

<strong>표</strong><br/>
| 이름  | 나이 | 직업   |<br/>
| --- | -- | ---- |<br/>
| 홍길동 | 30 | 개발자  |<br/>
| 김철수 | 25 | 디자이너 |<br/><br/>

<strong>리스트</strong><br/>
  - 순서 없는 리스트: \`-\`, \`*\`, \`+\`<br/>
  - 순서 있는 리스트:<br/>
    1. 첫 번째 항목<br/>
    2. 두 번째 항목<br/><br/>

<strong>인용문</strong><br/>
<blockquote>이렇게 > 기호로 인용문을 만들 수 있어요.</blockquote><br/>

<strong>링크</strong><br/>
[마크다운 문법 참고]
(<a href="https://www.markdownguide.org/basic-syntax/" target="_blank">https://www.markdownguide.org/basic-syntax/</a>)
`;
