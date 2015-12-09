'''
Project 3 Data Munging

Instructions: https://www.udacity.com/course/viewer#!/c-nd002/l-3168208620/m-3179628573
'''
import xml.etree.ElementTree as ET
import IPython
import audit

def street_name_check():
    '''
    Checks street name or suffix of each address and writes output list to file
    for manual check of common street names
    '''

    street_types = audit.audit(file_location)
    print("Finished getting street names")

    output = open("suffix.txt", 'w', errors = 'replace')

    print("Writing file")
    suffix_list = sorted(street_types.keys())

    for suffix in suffix_list:
        output.write(suffix + "\n")

    return

street_name_check()
