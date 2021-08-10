import re

test_string = 'addFAcct'

pattern = re.compile(r'add(FB|TW|IG|PI|TM|DS|RDIT|BLOG|TWH|PT)Acct')

matches = pattern.fullmatch(test_string)
print(matches == None)
