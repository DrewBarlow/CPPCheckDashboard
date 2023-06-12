import json 

json_f = open('json/parsed.json')
data = json.load(json_f)


file_paths_list = list(data.keys())
for i in range(len(file_paths_list)):
    new_data = {}
    with open(file_paths_list[i], 'r') as file:
        unsorted_list = []
        errors = []
        preprocessors = []
        for line in list(data[file_paths_list[i]]):
            unsorted_list.append(data[file_paths_list[i]][line]["tokenized_lines"])
            errors.append(data[file_paths_list[i]][line]["errs"])
            preprocessors.append(line)
            num_checks = data[file_paths_list[i]][line]["num_checks"]
            del data[file_paths_list[i]][line]
        
        # merge all preprocessor subdictionaries into one subdictionary 
        merged_array = [element for sublist in unsorted_list for element in sublist]
        unique_list = [x for j, x in enumerate(merged_array) if x not in merged_array[:j]]
        #unique_list.sort()
        errors = [element for sublist in errors for element in sublist]
        errors = [x for j, x in enumerate(errors) if x not in errors[:j]]
        # grabs the line number and error message from the error string
        errors = [e.split(":")[1:5:3] for e in errors if len(e.split(":")) > 1]

        # creates a subdictionary for every line number
        line_number = 0    
        for line in file:
            message = ""
            line_number += 1
            new_data[str(line_number)] = {'code': line.strip('\n'), 'message': message, 'Checked': False, 'error': False}
        
        data[file_paths_list[i]]['token']= {"num_checks": num_checks, "preprocessor_config": preprocessors}
        data[file_paths_list[i]]['data'] = new_data
        
        # traverses through error list and matches them with the corresponding subdictionary 
        for k in range(len(errors)):
            if (len(errors[k]) > 1):
                data[file_paths_list[i]]['data'][str(errors[k][0])]['message'] = errors[k][1].strip()
                data[file_paths_list[i]]['data'][str(errors[k][0])]['error'] = True
        
        for l in range(len(unique_list)):
            data[file_paths_list[i]]['data'][str(unique_list[l])]['Checked'] = True
        with open("cppcyberwebapp/data/result.json", "w") as outfile:
            json.dump(data, outfile, indent=2)


json_f.close()

