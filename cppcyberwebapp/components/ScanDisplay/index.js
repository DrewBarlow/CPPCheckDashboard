import { useState } from "react";
import StatDisplay from "../StatsDisplay/index";
import CodeSection from "./CodeSection";

export default function ScanDisplay({ scanResults }) {
  //file selected by the user
  const [currentFile, setCurrentFile] = useState(null);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPageCount] = useState(0);
  const [pageIterator, setPageIterator] = useState(1000);

  const CppCheckResult = scanResults;
  const ScannedFilesList = Object.keys(CppCheckResult);

  function getFileName(e) {
    //Obtains the selected file from the dropdown based on the user's selection
    const { value } = e.target;
    const selectedFileCode = CppCheckResult[value]["data"];
    const totalCodeLines = Object.keys(selectedFileCode).length;
    setPageCount(Math.ceil(totalCodeLines / pageIterator));
    setCurrentPageCount(1);
    setCurrentFile(value);
  }

  function getPageIterator(e) {
    //Calculation Used to set the amount of pages displayed to the users screen
    const { value } = e.target;
    const pageIterator = parseInt(value.split(" ")[0]);
    setPageIterator(pageIterator);
    const totalCodeLines = Object.keys(
      CppCheckResult[currentFile]["data"]
    ).length;
    //sets the total lines of code displayed to the user
    setPageCount(Math.ceil(totalCodeLines / pageIterator));
    //starts and the beginning of the page
    setCurrentPageCount(1);
  }

  function getNextPage() {
    //goes to the next page of the file
    if (currentPage < pageCount) {
      const newNextPage = currentPage + 1;
      setCurrentPageCount(newNextPage);
      //window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function getPrevPage() {
    //goes to the previous page of the file
    if (currentPage > 1) {
      const newPrevPage = currentPage - 1;
      setCurrentPageCount(newPrevPage);
      //window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function changePage(e) {
    //Changes the current page the user is on based the pagination dropdown
    const { value } = e.target;
    if (value >= 1 && value <= pageCount) {
      setCurrentPageCount(value);
    }
  }

  function getNonScannedLines() {
    //Counts the number of lines that have not been scanned
    let counter = 0;
    Object.keys(CppCheckResult[currentFile]["data"]).map((key, index) => {
      if (CppCheckResult[currentFile]["data"][key]["Checked"] === false) {
        counter += 1;
      }
    });
    return counter;
  }

  function getErrorLines() {
    //Counts the number of lines that have not been scanned
    let counter = 0;
    Object.keys(CppCheckResult[currentFile]["data"]).map((key, index) => {
      if (CppCheckResult[currentFile]["data"][key]["error"] === true) {
        counter += 1;
      }
    });
    return counter;
  }

  return (
    <div className="mx-16">
      <div>
        <div className="flex items-center">
          <h1 className="py-4 text-6xl text-slate-300 font-thin text-center break-all">
            {currentFile || "Select File"}
          </h1>
        </div>
      </div>
      <div>
        <div>
          <select
            className="select select-info w-full max-w-lg my-2"
            onChange={getFileName}
            defaultValue={"default"}
          >
            <option disabled value="default">
              Select A File
            </option>
            {ScannedFilesList.map((fileName) => (
              <option key={fileName}>{fileName}</option>
            ))}
          </select>
        </div>
        <div>
          {CppCheckResult[currentFile] && (
            <select
              className="select select-info w-full max-w-xs my-2"
              onChange={getPageIterator}
              defaultValue={"default"}
            >
              <option disabled value="default">
                Select Pagination Iteration - Default 1000
              </option>
              <option key={50}>50 Lines Of Page</option>
              <option key={100}>100 Lines Per Page</option>
              <option key={1000}>1000 Lines Per Page</option>
              <option key={5000}>5000 Lines Per Page</option>
            </select>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-12 grid-rows">
        {CppCheckResult[currentFile] && (
          <CodeSection
            selectedFileObj={CppCheckResult[currentFile]}
            currentPage={currentPage}
            pageIterator={pageIterator}
          />
        )}
        {CppCheckResult[currentFile] && (
          <StatDisplay
            linesOfCode={
              Object.keys(CppCheckResult[currentFile]["data"]).length
            }
            errorsFound={getErrorLines()}
            nonLinesOfCode={getNonScannedLines(
              CppCheckResult[currentFile]["data"]
            )}
            numChecks={CppCheckResult[currentFile]?.token?.num_checks || 0}
            preprocessorConfig={
              CppCheckResult[currentFile]?.token?.preprocessor_config || "N/A"
            }
          />
        )}
      </div>
      {pageCount > 1 && (
        <div className=" py-4">
          <button className="btn rounded-r-none" onClick={getPrevPage}>
            «
          </button>
          <div className="dropdown">
            <label tabindex="0" className="btn rounded-none">
              Page {currentPage}/{pageCount}
            </label>
            <div
              tabindex="0"
              className="dropdown-content card card-compact w-64 p-2 shadow bg-neutral-focus
              text-primary-content"
            >
              <div className="card-body">
                <h3 className="card-title">Navigate Page</h3>
                <p>Jump to a specific page</p>
                <input
                  type="number"
                  placeholder="Place in the page"
                  className="input w-full max-w-xs"
                  min={1}
                  max={pageCount}
                  onChange={changePage}
                />
              </div>
            </div>
          </div>
          <button className="btn rounded-l-none" onClick={getNextPage}>
            »
          </button>
        </div>
      )}
      {CppCheckResult[currentFile] && (
        <h1 className="py-2 text-xl font-light text-white">
          <span className="flex">
            Scan Result:&nbsp;
            <p className="text-success">
              {Math.round(
                (CppCheckResult[currentFile]?.token?.num_checks * 100) / 27
              )}
              %
            </p>
          </span>
        </h1>
      )}
    </div>
  );
}
