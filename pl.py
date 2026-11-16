import re
def norm(x): return '\n'.join(l.strip() for l in x.split('\n'))
class Patcher:
    def __init__(self,path): self.path=path; self.t=open(path).read()
    def rep(self,old,new,count=1):
        o=norm(old); n=norm(new); c=self.t.count(o); assert c==count,(o[:90],c); self.t=self.t.replace(o,n)
    def rx(self,pat,new,flags=re.S):
        m=re.search(pat,self.t,flags); assert m,pat[:90]; self.t=self.t[:m.start()]+norm(new)+self.t[m.end():]
    def save(self): open(self.path,'w').write(self.t)
