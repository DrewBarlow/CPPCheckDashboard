import React from "react";
import { useState } from "react";

export default function CodeSection({
  selectedFileObj,
  currentPage,
  pageIterator,
}) {
  const [toggleMessageDisplay, SetToggleMessageDisplay] = useState({
    isShowing: false,
    currSelection: 0,
  });

  function getCollapseCode(checked, error, code, lineNum) {
    return checked === true && error === false ? (
      <>
        <div className="collapse-title text-xl text-success font-medium py-0">
          <span class="inline-flex items-baseline text-gray-600">
            {lineNum}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {code}
        </div>
      </>
    ) : checked === true && error === true ? (
      <div className="collapse-title text-xl text-error font-medium py-0">
        <span class="inline-flex items-baseline text-gray-600">{lineNum}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {code}
      </div>
    ) : (
      <div className="collapse-title text-xl text-warning font-medium py-0">
        <span class="inline-flex items-baseline text-gray-600">{lineNum}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {code}
      </div>
    );
  }

  function getCodeMessage(message) {
    return message === "" ? (
      <></>
    ) : (
      <div className="collapse-content text-white">
        <p>{message}</p>
      </div>
    );
  }

  function getCurrentLineNum(index, currpage, pageIter) {
    //calculation to track the line number for each piece of code code
    return index + (currpage - 1) * pageIter + 1;
  }

  return (
    <div className="md:col-span-9 col-span-full bg-black card mockup-code">
      {selectedFileObj !== undefined ? (
        Object.keys(selectedFileObj["data"])
          .slice((currentPage - 1) * pageIterator, currentPage * pageIterator)
          .map((key, index) => (
            <div
              key={key}
              tabindex={index}
              className={`collapse font-mono ${
                toggleMessageDisplay.lineNumber === index &&
                toggleMessageDisplay.isShowing &&
                selectedFileObj["data"][key]["message"].length
                  ? `collapse-open`
                  : selectedFileObj["data"][key]["code"].length < 96
                  ? "h-8 collapse-close"
                  : "collapse-close"
              } ${
                selectedFileObj["data"][key]["message"].length
                  ? `cursor-pointer`
                  : ""
              }`}
              onClick={(e) => {
                !selectedFileObj["data"][key]["message"]
                  ? e.preventDefault()
                  : SetToggleMessageDisplay({
                      isShowing: !toggleMessageDisplay.isShowing,
                      lineNumber: index,
                    });
              }}
            >
              {getCollapseCode(
                selectedFileObj["data"][key]["Checked"],
                selectedFileObj["data"][key]["error"],
                selectedFileObj["data"][key]["code"],
                getCurrentLineNum(index, currentPage, pageIterator)
              )}
              {getCodeMessage(selectedFileObj["data"][key]["message"])}
            </div>
          ))
      ) : (
        <></>
      )}
    </div>
  );
}
