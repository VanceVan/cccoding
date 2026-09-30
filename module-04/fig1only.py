import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt, numpy as np
from matplotlib.patches import Rectangle, FancyBboxPatch, Circle, Polygon, FancyArrowPatch, Ellipse
plt.rcParams['font.family']='DejaVu Sans'
ACC='#1F3B73'; RED='#B3261E'; GRN='#1E6B4E'; GREY='#8A8A8A'; LGREY='#DCDCDC'; DARK='#222222'
def tag(ax,x,y,n,c=ACC,fs=6.5):
    ax.text(x,y,n,ha='center',va='center',fontsize=fs,color='white',zorder=9,
            bbox=dict(boxstyle='circle,pad=0.25',fc=c,ec='none'))

# ============ FIG 1: design sketch ============
fig,ax=plt.subplots(figsize=(6.4,4.0),dpi=200); ax.set_xlim(0,10); ax.set_ylim(-2.35,9.6); ax.axis('off')
ax.text(5,9.75,'Figure 1.  Transtibial prosthesis — system layout (sagittal view)',ha='center',fontsize=8.5,weight='bold')
# residual limb + knee
ax.add_patch(FancyBboxPatch((4.3,7.2),1.4,1.9,boxstyle='round,pad=0.05,rounding_size=0.3',fc='#F0F0F0',ec=DARK,lw=1.1))
ax.add_patch(Circle((5.0,7.15),0.30,fc='white',ec=DARK,lw=1.2,zorder=5))
ax.text(6.15,7.15,'knee joint — PRESERVED,\nnot replicated',fontsize=6.6,color=GRN,va='center',linespacing=1.3)
ax.text(5.0,8.95,'residual limb (transtibial)',ha='center',fontsize=6.4,color=DARK)
# socket
ax.add_patch(Polygon([[4.15,6.95],[5.85,6.95],[5.62,4.95],[4.38,4.95]],closed=True,fc='#E8EDF6',ec=ACC,lw=1.4))
ax.add_patch(Polygon([[4.32,6.85],[5.68,6.85],[5.50,5.10],[4.50,5.10]],closed=True,fc='white',ec=GREY,lw=0.8,ls='--'))
tag(ax,4.05,6.35,'1'); tag(ax,4.05,5.35,'2')
# pylon
ax.add_patch(Rectangle((4.83,3.05),0.34,1.90,fc=LGREY,ec=DARK,lw=1.1))
ax.add_patch(Polygon([[4.72,4.95],[5.28,4.95],[5.14,4.72],[4.86,4.72]],closed=True,fc=GREY,ec=DARK,lw=0.8))
ax.add_patch(Polygon([[4.72,3.05],[5.28,3.05],[5.14,3.28],[4.86,3.28]],closed=True,fc=GREY,ec=DARK,lw=0.8))
tag(ax,4.45,4.00,'3')
# ankle unit
ax.add_patch(FancyBboxPatch((4.52,2.28),0.96,0.78,boxstyle='round,pad=0.04,rounding_size=0.12',fc='#DCE4F2',ec=ACC,lw=1.3))
ax.add_patch(Circle((5.0,2.67),0.13,fc=ACC,ec='none',zorder=6))
tag(ax,4.20,2.67,'4')
# ESAR keel foot
ax.add_patch(Polygon([[4.55,2.28],[6.95,1.42],[6.95,1.12],[4.42,2.00]],closed=True,fc=ACC,alpha=0.85,ec=ACC,lw=1.0))
ax.add_patch(Polygon([[4.60,2.20],[3.35,1.30],[3.35,1.00],[4.45,1.92]],closed=True,fc=ACC,alpha=0.55,ec=ACC,lw=1.0))
ax.plot([6.2,6.95],[1.68,1.42],color='white',lw=0.9,zorder=7)
tag(ax,6.55,1.85,'5'); tag(ax,3.55,1.62,'6')
# foot shell + ground
ax.add_patch(Polygon([[3.20,1.02],[7.05,1.02],[7.05,0.72],[3.20,0.72]],closed=True,fc='none',ec=GREY,lw=1.0,ls=':'))
ax.plot([2.6,7.6],[0.70,0.70],color=DARK,lw=1.6)
for x in np.arange(2.7,7.6,0.35): ax.plot([x,x-0.18],[0.70,0.52],color=GREY,lw=0.7)
ax.text(7.35,1.55,'foot shell',fontsize=6.0,color=GREY,va='center')
key=('① total-surface-bearing socket, carbon/epoxy laminate     ② silicone liner + elevated vacuum suspension\n'
     '③ modular pylon, 30 mm Ø tube, pyramid adapters              ④ hydraulic-damped ankle, elastomer bushing (multiaxial)\n'
     '⑤ ESAR carbon forefoot keel, split toe                              ⑥ carbon heel spring (controlled plantarflexion)')
ax.text(5.0,-1.35,key,ha='center',fontsize=6.0,color=DARK,linespacing=1.8)
plt.savefig('fig1_design.png',dpi=200,bbox_inches='tight',facecolor='white'); plt.close()

