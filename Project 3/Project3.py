'''
Project 3 Data Munging

Instructions: https://www.udacity.com/course/viewer#!/c-nd002/l-3168208620/m-3179628573
'''


import xml.etree.ElementTree as ET
import IPython
from collections import Counter

la_file = ET.iterparse("data\los-angeles_california.osm")
test_file = ET.parse(r"data\test.xml")
