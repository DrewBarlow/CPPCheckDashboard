import json 
from dominate import tags
import time

start = time.time()

json_f = open('json/parsed.json')
data = json.load(json_f)

# Code to append each source code lines to the JSON file
file_paths_list = list(data.keys())

for i in range(len(file_paths_list)):
    new_data = {}
    with open(file_paths_list[i], 'r') as file:
        
        processor = next(iter(data[file_paths_list[i]]))
        data[file_paths_list[i]]["token"] = data[file_paths_list[i]].pop(processor)
        tokens = data[file_paths_list[i]]["token"]["toks"]

        errors = data[file_paths_list[i]]["token"]['errs']
        data[file_paths_list[i]]["token"]["preprocessor_config"] = processor
        # List comprehension: Loops through errors and splits by ":" and picks every the 2nd and 4th element
        errors = [e.split(":")[1:5:3] for e in errors if len(e.split(":")) > 1]
        line_number = 0    
        for line in file:
            message = ""

            line_number += 1
            new_data[str(line_number)] = {'code': line.strip('\n'), 'message': message, 'status': 'Checked'}
    data[file_paths_list[i]]['data'] = new_data
    
    for k in range(len(errors)):
        if (len(errors[k]) > 1):
            data[file_paths_list[i]]['data'][str(errors[k][0])]['message'] = errors[k][1].strip()  
with open("data.json", "w") as outfile:
    json.dump(data, outfile, indent=2)


json_f.close()

end = time.time()

print(end - start)
#CWE590_Free_Memory_Not_on_Heap__delete_class_declare_52a.cpp