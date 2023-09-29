##var GK096 = ["Human","GeneQuery™ Human Schwann Cell Biology qPCR Array Kit","Description","11,23,35,47,59","A12,B12,C12,D12,E12",
#            "HST,D1,MET,HPSC,TCD,SLC,ALS,SLC,F3,RCC,NLC,ACTB,A1,HPSC,F1,TMH,DB1,SLC,ALS,D3,NPL,NDR,EPI,GAPDH,NDR,HPSC,EPH,A2,B2,SLC,TCD,E3,SWH,A4,NDR,LDHA,NDR,SWH,G1,TCD,AST,SLC,H2,FGF,G3,BCC,MDP,NONO,TCD,EPH,SLC,DB1,SLC,AST,TMH,NPL,SSM,B4,D4,PPIH,CDS,EPH,H1,DB1,NPL,E2,A3,NPL,H3,ALS,E4,GDC,CDS,NPL,NDR,TCD,C2,G2,B3,NDR,TCD,C4,F4,PPC,B1,NDR,AST,HPB,RCC,NPL,C3,NDR,NDR,MDP,G4,NTC"]


class Rec:
    def __init__(self, catgNum) -> None:
        self.catgNum = catgNum
        self.kitName = ""
        self.sp = ""
        self.genes = []


recs = []

with open('GK_data.txt','r') as f:
    handler = f.readlines
    print(handler.next())
    