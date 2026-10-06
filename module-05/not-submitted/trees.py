import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Polygon
plt.rcParams['font.family']='DejaVu Sans'
ACC='#1F3B73'; GRN='#1E6B4E'; RED='#B3261E'; AMB='#8A6D00'; GREY='#8A8A8A'; LG='#E9E9E9'; DARK='#222222'

def box(ax,x,y,w,h,t,fc='#E8EDF6',ec=ACC,fs=6.4,tc=DARK,bold=False):
    ax.add_patch(FancyBboxPatch((x-w/2,y-h/2),w,h,boxstyle='round,pad=0.05,rounding_size=0.10',fc=fc,ec=ec,lw=1.05))
    ax.text(x,y,t,ha='center',va='center',fontsize=fs,linespacing=1.3,color=tc,weight='bold' if bold else 'normal')
def dia(ax,x,y,w,h,t,fs=6.2):
    ax.add_patch(Polygon([[x,y+h/2],[x+w/2,y],[x,y-h/2],[x-w/2,y]],closed=True,fc='#FFF4D6',ec=AMB,lw=1.05))
    ax.text(x,y,t,ha='center',va='center',fontsize=fs,linespacing=1.25)
def arr(ax,x1,y1,x2,y2,lab='',off=(0.10,0),c=DARK,fs=5.9):
    ax.annotate('',xy=(x2,y2),xytext=(x1,y1),arrowprops=dict(arrowstyle='-|>',color=c,lw=1.0))
    if lab: ax.text((x1+x2)/2+off[0],(y1+y2)/2+off[1],lab,fontsize=fs,color=c,ha='left',va='center')

# ---------------- FIG 1: application-space narrowing ----------------
fig,ax=plt.subplots(figsize=(6.5,4.3),dpi=200); ax.set_xlim(0,12); ax.set_ylim(2.35,11.55); ax.axis('off')
box(ax,6,11.0,6.6,0.72,'Listed topic: "Yard tool interface"\n— too broad to scope a design against',fc='#F2F2F2',ec=GREY,fs=6.6)
arr(ax,6,10.64,6,10.12)
dia(ax,6,9.60,4.0,0.96,'Which user population?')
box(ax,1.95,9.60,3.3,0.98,'Power wheelchair user\n— chair already supplies\nreaction mass and traction',fc=LG,ec=GREY,fs=5.9,tc=GREY)
arr(ax,4.0,9.60,3.62,9.60,'excl.',(0.0,0.30),GREY)
box(ax,10.1,9.60,3.3,0.98,'Limited upper-limb\nfunction — different problem\n(tool actuation, not reaction)',fc=LG,ec=GREY,fs=5.9,tc=GREY)
arr(ax,8.0,9.60,8.44,9.60,'excl.',(0.0,0.30),GREY)
arr(ax,6,9.12,6,8.62,'manual wheelchair user,\nfull upper-limb function',(0.18,0))
dia(ax,6,8.08,4.0,0.96,'Which task class?')
box(ax,1.95,8.08,3.3,0.98,'Ride-on mowers\n— commercial adaptations\nalready exist',fc=LG,ec=GREY,fs=5.9,tc=GREY)
arr(ax,4.0,8.08,3.62,8.08,'excl.',(0.0,0.30),GREY)
box(ax,10.1,8.08,3.3,0.98,'Unpowered hand tools\n— no reaction-force\nproblem to solve',fc=LG,ec=GREY,fs=5.9,tc=GREY)
arr(ax,8.0,8.08,8.44,8.08,'excl.',(0.0,0.30),GREY)
arr(ax,6,7.60,6,7.10,'handheld powered tools',(0.18,0))
dia(ax,6,6.56,4.0,0.96,'Which operating terrain?')
box(ax,10.1,6.56,3.3,0.84,'Paved surfaces only\n— trivially solved',fc=LG,ec=GREY,fs=5.9,tc=GREY)
arr(ax,8.0,6.56,8.44,6.56,'excl.',(0.0,0.28),GREY)
arr(ax,6,6.08,6,5.58,'soft, uneven, sloped residential turf',(0.18,0))
box(ax,6,4.78,9.4,1.30,'SCOPED APPLICATION SPACE\nIndependent residential yard maintenance by manual wheelchair users with full upper-limb\nfunction, for tasks requiring handheld powered tools on soft, uneven, sloped turf.',
    fc='#E6F0EA',ec=GRN,fs=6.7,bold=False)
ax.text(6,3.85,'Three candidate parameters for innovation (no solution committed at this stage):',ha='center',fontsize=6.4,style='italic')
box(ax,2.25,3.05,4.0,0.86,'P1  Reaction-force path\nand stability margin',fc='#E8EDF6',ec=ACC,fs=6.2)
box(ax,6.0,3.05,3.1,0.86,'P2  Seated reach and\nworkspace envelope',fc='#E8EDF6',ec=ACC,fs=6.2)
box(ax,9.75,3.05,4.0,0.86,'P3  Mobility while equipped\n(stow / quick release)',fc='#E8EDF6',ec=ACC,fs=6.2)
plt.savefig('fig1_scope.png',dpi=200,bbox_inches='tight',facecolor='white'); plt.close()

# ---------------- FIG 2: regulatory & funding pathway ----------------
fig,ax=plt.subplots(figsize=(6.5,4.7),dpi=200); ax.set_xlim(0,13); ax.set_ylim(1.0,13.1); ax.axis('off')
box(ax,6.5,12.55,5.0,0.60,'Candidate product definition',fc='#F2F2F2',ec=GREY,fs=6.5)
arr(ax,6.5,12.25,6.5,11.62)
dia(ax,6.5,11.00,5.6,1.22,'Does the product make a medical claim\n(diagnose, treat, mitigate, prevent)?',6.2)
arr(ax,3.70,11.00,2.90,9.72,'no',(-0.95,0.15),GRN)
arr(ax,9.30,11.00,10.10,9.72,'yes',(0.30,0.15),RED)
box(ax,2.90,9.18,4.7,1.02,'NOT an FDA-regulated device\n\u2014 a consumer product',fc='#E6F0EA',ec=GRN,fs=6.3)
box(ax,10.10,9.18,4.7,1.02,'An FDA device \u2014 class determination\nand 510(k) assessment required',fc='#FFF0EE',ec=RED,fs=6.3)
arr(ax,2.90,8.67,2.90,8.02); arr(ax,10.10,8.67,10.10,8.02)
box(ax,2.90,7.25,4.7,1.46,'Governing standards:\nANSI/OPEI power-tool safety,\nISO 7176 for the chair interface,\nproduct-liability exposure',fc='#E8EDF6',ec=ACC,fs=6.1)
box(ax,10.10,7.25,4.7,1.46,'Adds: design controls,\nrisk file (ISO 14971),\nsubmission cost and a\n6\u201312 month timeline',fc='#E8EDF6',ec=ACC,fs=6.1)
ax.annotate('',xy=(5.45,5.95),xytext=(2.90,6.52),arrowprops=dict(arrowstyle='-|>',color=DARK,lw=1.0))
ax.annotate('',xy=(7.55,5.95),xytext=(10.10,6.52),arrowprops=dict(arrowstyle='-|>',color=DARK,lw=1.0))
dia(ax,6.5,5.32,5.6,1.22,'Is third-party reimbursement sought?',6.2)
arr(ax,3.70,5.32,2.90,4.10,'no',(-0.95,0.12),GRN)
arr(ax,9.30,5.32,10.10,4.10,'yes',(0.30,0.12),AMB)
box(ax,2.90,3.46,4.7,1.30,'Cash-pay, nonprofit or DIY\ndistribution \u2014 a hard price ceiling\nthat drives the BOM from day one',fc='#E6F0EA',ec=GRN,fs=6.1)
box(ax,10.10,3.46,4.7,1.30,'Needs HCPCS coding and a\nmedical-necessity case; yard work\nis unlikely to meet the home restriction',fc='#FFF4D6',ec=AMB,fs=6.1)
ax.text(6.5,1.75,'Working assumption for this project: no medical claim and no reimbursement \u2014 the left-hand path throughout.\nThis single determination has the largest effect on cost, schedule and achievable target price.',
        ha='center',fontsize=6.2,style='italic',linespacing=1.55)
plt.savefig('fig2_regulatory.png',dpi=200,bbox_inches='tight',facecolor='white'); plt.close()

# ---------------- FIG 3: Phase 0 exit gate ----------------
fig,ax=plt.subplots(figsize=(6.5,4.6),dpi=200); ax.set_xlim(0,12.4); ax.set_ylim(0.95,12.2); ax.axis('off')
box(ax,4.3,11.70,5.2,0.58,'Phase 0 Planning complete',fc='#F2F2F2',ec=GREY,fs=6.5)
ys=[10.60,9.00,7.40,5.80,4.20]
qs=['Need validated with \u2265 8 manual wheelchair\nusers who actually do yard work?',
    'Served population large enough\nto justify tooling?',
    'Stability envelope feasible within\nISO 7176-1/-2 limits on a 5\u00b0 slope?',
    'Freedom to operate clear of\nexisting patents?',
    'Budget and schedule within\napproved tolerance?']
fails=['Return to user research \u2014\nneed not demonstrated',
       'Reposition (broaden the\ntool set) or stop',
       'Re-scope to a powered-chair\nplatform, or stop',
       'Design around, or license',
       'Re-scope deliverables']
arr(ax,4.3,11.41,4.3,11.14)
for i,(y,q,f) in enumerate(zip(ys,qs,fails)):
    dia(ax,4.3,y,7.0,1.06,q,5.9)
    box(ax,10.3,y,3.5,0.90,f,fc='#FFF0EE',ec=RED,fs=5.8)
    arr(ax,7.85,y,8.52,y,'no',(0.03,0.26),RED)
    nxt = ys[i+1]+0.53 if i+1<len(ys) else 3.32
    arr(ax,4.3,y-0.53,4.3,nxt,'yes',(0.16,0),GRN)
box(ax,4.3,2.76,5.8,0.86,'APPROVE entry to Phase 1\nConcept Development',fc='#E6F0EA',ec=GRN,fs=6.8,bold=True)
ax.text(4.3,1.60,'All five gates are evidence questions, not design questions.\nNo concept is selected at this gate.',ha='center',fontsize=6.0,style='italic',linespacing=1.5)
plt.savefig('fig3_gate.png',dpi=200,bbox_inches='tight',facecolor='white'); plt.close()
print('3 trees ok')
