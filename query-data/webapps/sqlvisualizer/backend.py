from dataiku.customwebapp import *

# Access the parameters that end-users filled in using webapp config
# For example, for a parameter called "input_dataset"
# input_dataset = get_webapp_config()["input_dataset"]
import dataiku
import pandas as pd
from flask import request
from pandasql import sqldf
import urllib.parse

@app.route('/first_api_call')
def first_call():
    path = request.url
    project_key_input = get_webapp_config()["project_key"]
    pathsplit = path.split("?javascript_var=")[1]
    new_query = urllib.parse.unquote(pathsplit)
    if 'FROM' in pathsplit:
        dataset_name = new_query.split('FROM ')[1]
        if 'WHERE' in pathsplit:
            dataset_name = (new_query.split('FROM ')[1]).split(' WHERE')[0]
        elif 'where' in pathsplit:
            dataset_name = (new_query.split('FROM ')[1]).split(' where')[0]
    else:
        dataset_name = new_query.split('from ')[1]
        if 'WHERE' in pathsplit:
            dataset_name = (new_query.split('from ')[1]).split(' WHERE')[0]
        elif 'where' in pathsplit:
            dataset_name = (new_query.split('from ')[1]).split(' where')[0]
    display_limit = get_webapp_config()["display_limit"]
    client = dataiku.api_client()
    project = client.get_project(project_key_input)
    locals()[dataset_name] = dataiku.Dataset(dataset_name, project_key=project_key_input).get_dataframe(sampling = 'head', limit = 10000)
    queried_data = pd.DataFrame(sqldf(new_query)).head(int(display_limit)).fillna("NaN")    
    data = queried_data.to_dict(orient = 'records')
    items = queried_data.to_dict() 
    return json.dumps(data)



# # Get a Dataframe over the first 3K rows
# dataset.get_dataframe(sampling='head', limit=3000)

# # Iterate over a random 10% sample
# dataset.iter_tuples(sampling='random', ratio=0.1)

# # Iterate over 27% of the values of column 'user_id'
# dataset.iter_tuples(sampling='random-column', sampling_column='user_id', ratio=0.27)

# # Get a chunked stream of dataframes over 100K randomly selected rows
# dataset.iter_dataframes(sampling='random', limit=100000)



#         {
#             "name": "display_limit",
#             "type": "STRING",
#             "label": "Display Row Limit",
#             "mandatory": true
#         },
#         {
#             "name": "process_sample_title",
#             "type": "SEPARATOR",
#             "label": "Processor Sampling",
#             "description": "When querying very large datasets, we can add a processor sample to save memory and increase time to compute query."
#         },
#                 {
#             "name": "sample_type",
#             "type": "STRING",
#             "label": "Sample Type",
#             "description": "head, or random",
#             "mandatory": true
#         },
#         {
#             "name": "random_ratio",
#             "type": "STRING",
#             "label": "Sample %",
#             "description": "e.g. 50%",
#             "mandatory": true
#         }









