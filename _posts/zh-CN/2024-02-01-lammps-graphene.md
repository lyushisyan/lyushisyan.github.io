---
layout: distill
title: LAMMPS 石墨烯热导率计算
date: 2024-02-01 23:36:10
tags: MD-simulations
categories: Method
giscus_comments: true
tabs: true


# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: sans-serif;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }

---

```jsx
#模型基本设置
units             metal
dimension         3
newton            on
boundary          p p p
atom_style        full
neighbor          0.3 bin
#模拟步长0.5fs
timestep          0.0005
#读取data文件
read_data        gp.data

#力场设置
pair_style       airebo 3.0
pair_coeff       * * CH.airebo C

#计算温度
compute       ke1  all  ke/atom
variable      kb  equal 8.625e-5
variable      temp1 atom  c_ke1/1.5/${kb}      
#热力学量输出
thermo	      1000
thermo_style  custom    step    temp   pxx pyy pzz press  vol
#温度初始化
velocity	all create 300 898758 mom yes rot yes dist gaussian

#能量最小化
min_style	    cg
minimize	    1.0e-8 1.0e-8 1000000 1000000

#npt系综下弛豫
thermo     2000
thermo_style   custom step temp pe ke etotal vol pxx pyy pzz press
fix         1 all npt temp 300 300 0.05 iso 0.0 0.0 0.5
dump	    1 all custom 100000 npt.xyz id type x y z 
run         500000
unfix       1
undump      1
reset_timestep 0

write_data  Gp.data

#nvt系综下弛豫
thermo     2000
thermo_style   custom step temp pe ke etotal vol pxx pyy pzz press
fix         1 all nvt temp 300 300 0.05 
dump	    1 all custom 20000 nvt.xyz id type x y z 
run         100000
unfix       1
undump      1
reset_timestep 0

#分块参数设置
variable X1 	 equal xlo
variable X2 	 equal xhi
variable Nlay    equal 100
variable Dscale  equal 1/${Nlay}   #分块个数
variable Len     equal ${X2}-${X1} #总长度
variable Dz      equal ${Len}/${Nlay} #每一块尺寸

#固定端和冷热源端点处坐标
variable   BL1    equal   ${X1}+2*${Dz}                 
variable   BL2    equal   ${X1}+6*${Dz}          
variable   BR1   equal   ${X2}-6*${Dz}          
variable   BR2   equal   ${X2}-2*${Dz}            

#区域设置
region	reg_all	block	${X1}  ${X2}   INF INF      INF INF     units box
#左侧固定端
region	fixed_L	block	INF    ${BL1}   INF INF      INF INF     units box
#左侧热源
region	Hot	block	${BL1}  ${BL2}   INF INF      INF INF     units box
#右侧冷源
region	Cold	block	${BR1} ${BR2}  INF INF      INF INF     units box
#右侧固定端
region	fixed_R	block	${BR2} INF     INF INF      INF INF     units box

#对以上区域内原子进行分组                
group	fixed_L		region	fixed_L         #fixed 
group	Hot		    region	Hot         #heatbath1
group	Cold		region	Cold        #heatbath2 
group	fixed_R		region	fixed_R        #fixed 
group   mobile      subtract all fixed_L fixed_R

reset_timestep 0
#改变边界条件，传热方向改为固定边界
change_box all boundary  f p p 

#固定两端
velocity   fixed_L      set 0  0  0  
velocity   fixed_R     set 0  0  0 
fix      fixed_L     fixed_L    setforce  0   0   0
fix      fixed_R     fixed_R   setforce  0   0   0

#设置langevin控制冷热源
fix	  3	     Hot	langevin 400 400 0.05 14565 tally yes
fix	  4	     Cold	langevin 200 200 0.05 16576 tally yes
#nve系综
fix   5      all   nve

#定义热源和冷源输入和输出的能量
variable Time 	 equal step
variable EL 	 equal f_3
variable ER 	 equal f_4

#分块设置
compute 18 all chunk/atom bin/1d x lower ${Dscale} units reduced
#计算每一块的温度
fix 8 all ave/chunk 1 200000 200000 18 v_temp1 file temp_relax.dat

dump 1 all xyz 100000 relax.xyz
thermo 20000
thermo_style custom step temp ke pe etotal press vol
run 200000
unfix     8
undump    1
reset_timestep 0

#保存温差和能量，以下数据用于计算温度梯度和热流
fix 11 all ave/chunk 1 10000000 10000000 18 v_temp1 file temp_equ.dat
fix	E_out	all print 2000 "${Time}  ${EL}  ${ER}" file Ener_equ.dat title "Time  E1  E2" screen no	

dump         1  all xyz 5000000 equ.xyz
thermo 1000000
thermo_style custom step temp ke pe etotal press vol
#运行
run 10000000
```