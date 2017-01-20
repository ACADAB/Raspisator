import openpyxl
import datetime
import sys
import requests
from openpyxl.styles import colors
from openpyxl.styles import Font, Color
import json as json
days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
r = requests.get("http://localhost/var/www/html/Raspisator/API/getProject.php?project_id="+sys.argv[1]+"&return_school_data="+sys.argv[2])
r = json.loads(r.text)
lpd = int(r['project']['lessons_per_day'])
startdate = datetime.datetime.strptime(r['project']['start'], '%Y-%m-%d')
finishdate = datetime.datetime.strptime(r['project']['finish'], '%Y-%m-%d')
print(startdate.weekday())
les = requests.get("http://localhost/var/www/html/Raspisator/API/getLessons.php?project_id="+sys.argv[1])
les = json.loads(les.text)
les = {i['id'] : i for i in les}
print(lpd)
grades = r['school']['grades']
teachers = r['school']['teachers']
subjects = r['school']['subjects']
a = json.loads('{"table": {"table": [[-1, -1, -1, -1], [0, 4, -1, -1], [-1, -1, -1, -1], [2, -1, 6, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], "width": 6, "height": 4}, "grades": ["1", "2", "3", "4"], "lessons": [{"x": 1, "y": 0, "color": "red", "db_id": "2", "index": 2, "isUsed": true}, {"x": -1, "y": -1, "color": "red", "db_id": "2", "index": 0, "isUsed": false}, {"x": 3, "y": 0, "color": "red", "db_id": "2", "index": 1, "isUsed": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 1, "isUsed": false}, {"x": 1, "y": 1, "color": "yellow", "db_id": "3", "index": 3, "isUsed": true}, {"x": -1, "y": -1, "color": "blue", "db_id": "6", "index": 3, "isUsed": false}, {"x": 3, "y": 2, "color": "blue", "db_id": "6", "index": 0, "isUsed": true}, {"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 2, "isUsed": false}, {"x": -1, "y": -1, "color": "red", "db_id": "3", "index": 4, "isUsed": false}, {"x": -1, "y": -1, "color": "red", "db_id": "4", "index": 5, "isUsed": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 6, "isUsed": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "2", "index": 7, "isUsed": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 8, "isUsed": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "4", "index": 9, "isUsed": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 10, "isUsed": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "1", "index": 11, "isUsed": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "2", "index": 12, "isUsed": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "3", "index": 13, "isUsed": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "4", "index": 14, "isUsed": false}, {"x": -1, "y": -1, "color": "yellow", "db_id": "6", "index": 15, "isUsed": false}]}')

wb = openpyxl.workbook.Workbook()
ws = wb.active
for i in range(len(a['grades'])):
     ws[str(unichr(ord('A')+i+2))+'1'] = grades[a['grades'][i]]['grade_number'] + grades[a['grades'][i]]['grade_name']
     t = ws[str(unichr(ord('A')+i+2))+'1']
     t.font = Font(color=colors.BLACK, bold=True)
for i in range(len(a['table']['table'])):
     for j in range(len(a['table']['table'][i])):
          if(i % lpd == 0 and j == 0):
               for k in range(lpd):
                    ws['B'+str(lpd*i+k+2)] = k+1
               ws['A'+str(i+2)] = days[(startdate+datetime.timedelta(days=i//lpd)).weekday()]
          if(a['table']['table'][i][j] != -1):
               temp = a['lessons'][a['table']['table'][i][j]]['db_id']
               print(temp)
               st = ""
               st = st + subjects[les[temp]['subject_id']]['name'] + ' (' + teachers[les[temp]['teacher_id']]['name'] + ')'
               ws[str(unichr(ord('A')+j+2))+str(i+1+i//lpd)] = st
wb.save("ex.xlsx")
