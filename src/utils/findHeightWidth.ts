interface LetterDimensions {
  height: number;
  width: number;
}

export function findHeightWidth(
  divRef: React.RefObject<HTMLDivElement>
): Promise<LetterDimensions> {
  return document.fonts.ready.then(() => {
    const divElem = document.createElement("div");
    const spanElem = document.createElement("span");
    spanElem.innerText = "W";
    divElem.appendChild(spanElem);
    divElem.classList.add("flex");
    // spanElem.classList.add("font-sans");
    spanElem.classList.add("text-pa");
    spanElem.classList.add("bg-blue");
    // spanElem.style.fontFamily = "";
    divRef.current?.appendChild(divElem);

    const rect = spanElem.getBoundingClientRect();
    const exactWidth = rect.width.toFixed(2);
    const exactHeight = rect.height.toFixed(2);

    console.log("Exact width:", exactWidth);
    console.log("Exact height:", exactHeight);

    divRef.current?.removeChild(divElem);
    return {
      width: Number(exactWidth),
      height: Number(exactHeight),
    };
  });
}
