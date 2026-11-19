from pl import *
P=Patcher('r1/app.js')
# timers and badges update straight after cards are drawn (no "--:--" flash)
P.rep("function renderAll(){\nif(!appReady)return;\nrenderQuick();\nrenderWa();","function renderAll(){\nif(!appReady)return;\nsetTimeout(tick,0);\nrenderQuick();\nrenderWa();")
P.save();print('part4 ok')
