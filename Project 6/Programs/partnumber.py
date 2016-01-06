'''
Obscure Part Numbers and hours from JSON files
'''

import ipdb
import json
import random


def randomizer(part_num):
    '''
    Takes part number string and randomizes it
    '''

    random_pn = ""
    for character in part_num:
        if character != "-":
            random_pn += str((int(character) + random.randint(0,9)) % 10)
        else:
            random_pn += "-"

    return random_pn


def json_randomizer(input_file):
    '''
    Iterates through JSON part keys to randomize those first then replaces
    unit keys with values
    '''

    # Part Number Old to New Conversion dictionary
    part_dict = {}

    new_part_attr = {}
    for i, part_num in enumerate(input_file["part_attr"]):

        # Random Part Number and add to conversion dictionary
        rand_part_num = randomizer(part_num)
        part_dict[part_num] = rand_part_num

        # Rename component attribute
        attr = input_file["part_attr"][part_num]
        attr["desc"] = "Component " + str(i)

        new_part_attr[rand_part_num] = attr

    # Replace part number in units list
    new_units = []
    for item in input_file["units"]:
        old_key = item["key"]
        item["key"] = part_dict[old_key[:12]] + old_key[12:]
        new_units.append(item)

    output_file = {"part_attr": new_part_attr, "units": new_units}

    return output_file


def modify_file(input_file_path, output_name = None):
    '''
    Takes original json and modifies it
    '''
    if not output_name:
        output_name = "output.json"

    with open(input_file_path, "r") as input_file:
        # ipdb.set_trace()
        input_json = json.load(input_file)
        output_json = json_randomizer(input_json)

    with open(output_name, "w") as output_file:
        json.dump(output_json, output_file, indent=4)

    return
