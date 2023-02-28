var plateIdx = ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12",
                "B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12",
                "C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","C11","C12",
                "D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12",
                "E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","E11","E12",
                "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12",
                "G1","G2","G3","G4","G5","G6","G7","G8","G9","G10","G11","G12",
                "H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12",];

var plateXIdx = ["1","2","3","4","5","6","7","8","9","10","11","12"];
var plateYIdx = ["A","B","C","D","E","F","G","H"];

var productList = ["GK101","GK102","GK201","GK301","GK096"]


var GK096 = ["Human","GeneQuery™ Human Schwann Cell Biology qPCR Array Kit","Description","11,23,35,47,59","A12,B12,C12,D12,E12",
            "HST,D1,MET,HPSC,TCD,SLC,ALS,SLC,F3,RCC,NLC,ACTB,A1,HPSC,F1,TMH,DB1,SLC,ALS,D3,NPL,NDR,EPI,GAPDH,NDR,HPSC,EPH,A2,B2,SLC,TCD,E3,SWH,A4,NDR,LDHA,NDR,SWH,G1,TCD,AST,SLC,H2,FGF,G3,BCC,MDP,NONO,TCD,EPH,SLC,DB1,SLC,AST,TMH,NPL,SSM,B4,D4,PPIH,CDS,EPH,H1,DB1,NPL,E2,A3,NPL,H3,ALS,E4,GDC,CDS,NPL,NDR,TCD,C2,G2,B3,NDR,TCD,C4,F4,PPC,B1,NDR,AST,HPB,RCC,NPL,C3,NDR,NDR,MDP,G4,NTC"]
         

var GK101 = ["Human","GeneQuery™ Human Synoviocyte Cell Biology qPCR Array Kit","Description","11,23,35","A12,B12,C12",
            "ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB"]
            

var GK102 = ["Human","GeneQuery™ Human Synoviocyte Cell Biology qPCR Array Kit","Description","11,23,35","A12,B12,C12",
            "ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB"]


var GK201 = ["Mouse","GeneQuery™ Human Synoviocyte Cell Biology qPCR Array Kit","Description","11,23,35","A12,B12,C12",
            "mACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB"]

var GK301 = ["Other","GeneQuery™ Human Synoviocyte Cell Biology qPCR Array Kit","Description","11,23,35","A12,B12,C12",
            "rACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB,ACTB,GAPDH,LDHA,ACTB"]
      
