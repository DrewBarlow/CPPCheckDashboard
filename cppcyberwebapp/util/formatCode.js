export default function addTabing(jsonObject) {
  const ScannedFilesList = Object.keys(jsonObject);
  const tabValue = "\u00A0\u00A0";
  let tabTool = [];
  ScannedFilesList.forEach((scannedFile) => {
    Object.keys(jsonObject[scannedFile]["data"]).map(function (key, index) {
      const codeSection = jsonObject[scannedFile]["data"][key]["code"];
      const messageSection = jsonObject[scannedFile]["data"][key]["message"];
      if (
        !(codeSection.includes("{") && codeSection.includes("}")) &&
        codeSection.includes("}")
      ) {
        tabTool.pop();
      }
      if (codeSection) {
        jsonObject[scannedFile]["data"][key]["code"] =
          tabTool.join("") + codeSection;
      }
      if (messageSection) {
        jsonObject[scannedFile]["data"][key]["message"] =
          tabTool.join("") + "\u00A0\u00A0" + messageSection;
      }
      if (
        !(codeSection.includes("{") && codeSection.includes("}")) &&
        codeSection.includes("{")
      ) {
        tabTool.push(tabValue);
      }
    });
    tabTool = [];
  });

  return jsonObject;
}
