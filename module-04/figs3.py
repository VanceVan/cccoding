import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt, numpy as np
from matplotlib.patches import Circle, Polygon, Arc
plt.rcParams['font.family']='DejaVu Sans'
ACC='#1F3B73'; RED='#B3261E'; GRN='#1E6B4E'; GREY='#8A8A8A'; LGREY='#DCDCDC'; DARK='#222222'

fig,(a1,a2)=plt.subplots(1,2,figsize=(6.6,3.0),dpi=200,gridspec_kw={'width_ratios':[1.05,1.0]})

# (a) carved-turn force balance
a1.set_xlim(0,10); a1.set_ylim(0,9.6); a1.axis('off')
a1.set_title('(a)  Carved turn — whole-body balance',fontsize=7.6,weight='bold')
a1.plot([0.6,9.4],[1.5,1.5],color=DARK,lw=1.6)
for x in np.arange(0.8,9.4,0.45): a1.plot([x,x-0.2],[1.5,1.28],color=GREY,lw=0.6)
th=np.deg2rad(44.4); Lx,Ly=2.3,1.5
tipx,tipy=Lx+6.3*np.sin(th), Ly+6.3*np.cos(th)
a1.plot([Lx,tipx],[Ly,tipy],color=DARK,lw=2.4)            # body axis
a1.add_patch(Circle((tipx,tipy),0.42,fc=LGREY,ec=DARK,lw=1.2,zorder=5))
a1.text(tipx+0.6,tipy+0.1,'CoM',fontsize=6.3,va='center')
a1.plot([Lx-0.75,Lx+0.75],[Ly,Ly],color=ACC,lw=3.0,solid_capstyle='butt')  # board on edge
a1.text(Lx-0.1,Ly-0.42,'edge contact',fontsize=6.0,ha='center',color=ACC)
a1.plot([Lx,Lx],[Ly,Ly+6.6],color=GREY,lw=0.8,ls=':')
a1.add_patch(Arc((Lx,Ly),3.2,3.2,theta1=45.6,theta2=90,color=DARK,lw=0.9))
a1.text(Lx+1.05,Ly+2.0,r'$\theta$ = 44.4$\degree$',fontsize=6.4)
a1.annotate('',xy=(tipx,tipy-2.3),xytext=(tipx,tipy),arrowprops=dict(arrowstyle='-|>',color=ACC,lw=1.8))
a1.text(tipx+0.18,tipy-1.35,'$mg$ = 589 N',fontsize=6.3,color=ACC)
a1.annotate('',xy=(tipx-2.25,tipy),xytext=(tipx,tipy),arrowprops=dict(arrowstyle='-|>',color=RED,lw=1.8))
a1.text(tipx-2.4,tipy+0.35,'$F_c = mv^2/r$\n= 576 N',fontsize=6.3,color=RED,ha='center',linespacing=1.3)
a1.annotate('',xy=(Lx,Ly),xytext=(tipx,tipy),arrowprops=dict(arrowstyle='-|>',color=GRN,lw=2.0))
a1.text(Lx+2.35,Ly+1.25,'$R$ = 823 N\n(1.40 BW)',fontsize=6.4,color=GRN,linespacing=1.3)
a1.text(5.0,0.62,r'$v$ = 12 m/s,  $r$ = 15 m  $\rightarrow$  $a_c$ = 9.6 m/s$^2$;   $\theta=\arctan(a_c/g)$',
        fontsize=6.2,ha='center')

# (b) ankle coronal FBD
a2.set_xlim(0,10); a2.set_ylim(0,9.6); a2.axis('off')
a2.set_title('(b)  Prosthetic ankle — coronal plane',fontsize=7.6,weight='bold')
bx,by=5.0,3.0; ang=np.deg2rad(30)
dx,dy=np.cos(ang)*2.6, np.sin(ang)*2.6
a2.add_patch(Polygon([[bx-dx,by-dy],[bx+dx,by+dy],[bx+dx-0.06,by+dy-0.34],[bx-dx-0.06,by-dy-0.34]],
                     closed=True,fc=ACC,alpha=0.85,ec=ACC,lw=1.0))
a2.plot([0.6,9.4],[1.2,1.2],color=DARK,lw=1.5)
for x in np.arange(0.8,9.4,0.45): a2.plot([x,x-0.2],[1.2,0.98],color=GREY,lw=0.6)
E=(bx-dx,by-dy)
a2.add_patch(Circle(E,0.12,fc=RED,ec='none',zorder=6)); a2.text(E[0]-0.55,E[1]+0.05,'edge',fontsize=6.0,color=RED,ha='right')
AK=(bx+0.15,by+1.55); a2.add_patch(Circle(AK,0.20,fc='white',ec=GRN,lw=1.6,zorder=6))
a2.text(AK[0]+0.4,AK[1]+0.15,'prosthetic\nankle',fontsize=6.2,color=GRN,linespacing=1.25)
a2.plot([AK[0],AK[0]-0.2],[AK[1],AK[1]+2.5],color=DARK,lw=2.2)
a2.text(AK[0]-1.15,AK[1]+2.05,'pylon',fontsize=6.1,ha='center')
a2.annotate('',xy=(E[0]+0.85,E[1]+2.05),xytext=E,arrowprops=dict(arrowstyle='-|>',color=RED,lw=1.9))
a2.text(E[0]-0.35,E[1]+1.7,'$N$ = 823 N',fontsize=6.3,color=RED,ha='right')
a2.annotate('',xy=(E[0],0.72),xytext=(AK[0],0.72),arrowprops=dict(arrowstyle='<|-|>',color=DARK,lw=0.9))
a2.text((E[0]+AK[0])/2,0.32,'$e$ = 0.13 m',fontsize=6.3,ha='center')
a2.plot([AK[0],AK[0]],[0.72,AK[1]],color=GREY,lw=0.7,ls=':')
a2.plot([E[0],E[0]],[0.72,E[1]],color=GREY,lw=0.7,ls=':')
a2.text(5.0,8.35,r'$M_c = N e = 823(0.13) = 107$ N$\cdot$m',fontsize=7.0,ha='center')
a2.text(5.0,7.60,'sustained frontal-plane moment — absent in walking',fontsize=6.2,ha='center',style='italic',color=DARK)
plt.tight_layout(); plt.savefig('fig4_snowfbd.png',dpi=200,bbox_inches='tight',facecolor='white'); plt.close()
print('fig4 ok')
