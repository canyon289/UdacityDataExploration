import xml.etree.cElementTree as ET
import pprint
import re
"""
Your task is to explore the data a bit more.
The first task is a fun one - find out how many unique users
have contributed to the map in this particular area!

The function process_map should return a set of unique user IDs ("uid")
"""

def get_user(element):
    return element.get("uid")

def get_id(element):
    if element.tag in ["way", "node"]:
        return element.get("id")



def process_map(filename):
    users = set()
    ids = set()
    for _, element in ET.iterparse(filename):
        if get_user(element):
            users.add(get_user(element))
        
        if get_id(element):
            ids.add(get_id(element))
            
    return users, ids


def test():

    users, ids = process_map('example.osm')
    pprint.pprint(users)
    assert len(users) == 6
    print(len(ids))



if __name__ == "__main__":
    test()