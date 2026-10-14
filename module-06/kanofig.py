import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt, numpy as np
plt.rcParams['font.family']='DejaVu Sans'
ACC='#1F3B73'; GRN='#1E6B4E'; RED='#B3261E'; AMB='#8A6D00'; GREY='#8A8A8A'; DARK='#222222'

fig,ax=plt.subplots(figsize=(7.0,5.0),dpi=200)
ax.set_xlim(-1.30,1.34); ax.set_ylim(-1.16,1.16); ax.axis('off')
x=np.linspace(-1,1,500)
basic   = 0.15 - 1.10*np.exp(-2.6*(x+1.0))
exciter = 0.06 + 0.90*np.exp( 1.9*(x-1.0))
perf    = 0.92*x
unspok  = basic - 0.20

ax.annotate('',xy=(1.26,0),xytext=(-1.26,0),arrowprops=dict(arrowstyle='-|>',color=DARK,lw=1.2))
ax.annotate('',xy=(0,1.10),xytext=(0,-1.10),arrowprops=dict(arrowstyle='-|>',color=DARK,lw=1.2))
ax.annotate('',xy=(0,-1.10),xytext=(0,1.10),arrowprops=dict(arrowstyle='-|>',color=DARK,lw=1.2))
ax.text(0.05,1.10,'High satisfaction / Delighted',fontsize=8.0,ha='left',va='center')
ax.text(0.05,-1.10,'Low satisfaction / Disgusted',fontsize=8.0,ha='left',va='center')
ax.text(-1.30,-0.10,'Absent\nquality for performance\nnot achieved',fontsize=7.0,ha='left',va='top',linespacing=1.3)
ax.text(1.32,0.30,'Fully implemented\nhigh quality performance',fontsize=7.0,ha='right',va='center',linespacing=1.3)

ax.plot(x,perf,color=ACC,lw=1.8)
ax.plot(x,basic,color=GRN,lw=1.8)
ax.plot(x,exciter,color=RED,lw=1.8)
ax.plot(x,unspok,color=AMB,lw=1.6,ls=(0,(5,3)))

ax.text(-1.26,0.92,'③  Exciters & delighters\n     EXCITERS',fontsize=8.0,color=RED,ha='left',weight='bold',linespacing=1.4)
ax.text(0.10,0.88,'①  Performance / linear\n     SPOKENS',fontsize=8.0,color=ACC,ha='left',weight='bold',linespacing=1.4)
ax.text(0.40,-0.30,'②  Threshold / basic\n     EXPECTERS',fontsize=8.0,color=GRN,ha='left',weight='bold',linespacing=1.4)
ax.text(0.40,-0.64,'④  UNSPOKENS\n     same response as basics;\n     never surface in interviews',
        fontsize=7.4,color=AMB,ha='left',weight='bold',linespacing=1.4)

def mk(xs,curve,codes,color):
    pts={}
    for xv,c in zip(xs,codes):
        yv=float(np.interp(xv,x,curve))
        ax.plot(xv,yv,'o',ms=13,mfc='white',mec=color,mew=1.6,zorder=6)
        ax.text(xv,yv,c,fontsize=5.9,ha='center',va='center',color=color,weight='bold',zorder=7)
        pts[c]=(xv,yv)
    return pts
E=mk([-0.85,-0.55,-0.15,0.35,0.85], basic,   ['E1','E2','E3','E4a','E4b'], GRN)
S=mk([-0.75,-0.40,0.15,0.60],       perf,    ['S1','S2','S3','S4'],        ACC)
U=mk([-0.70,-0.35,0.15,0.65],       unspok,  ['U1','U2','U3','U4'],        AMB)
X=mk([-0.70,-0.25,0.22,0.46,0.88],  exciter, ['X1a','X2','X3','X1b','X4'], RED)

for (a,b,col) in ((E['E4a'],E['E4b'],GRN),(X['X1a'],X['X1b'],RED)):
    ax.annotate('',xy=(b[0]-0.07,b[1]-0.04),xytext=(a[0]+0.07,a[1]+0.05),
                arrowprops=dict(arrowstyle='-|>',color=col,lw=1.0,ls=(0,(2,2)),
                                connectionstyle='arc3,rad=-0.18'),zorder=4)
ax.plot(0.95,-0.80,'o',ms=13,mfc='white',mec=GREY,mew=1.6,zorder=6)
ax.text(0.95,-0.80,'I1',fontsize=5.9,ha='center',va='center',color=GREY,weight='bold',zorder=7)
ax.text(0.95,-0.93,'Indifferent',fontsize=7.2,color=GREY,ha='center')
plt.savefig('kano_diagram.png',dpi=200,bbox_inches='tight',facecolor='white'); plt.close()
print('ok')
