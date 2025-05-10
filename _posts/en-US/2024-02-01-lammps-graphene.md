---
layout: distill
title: Graphene Thermal Conductivity Calculation (LAMMPS)
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
# Basic model setup
units             metal
dimension         3
newton            on
boundary          p p p
atom_style        full
neighbor          0.3 bin
# Simulation timestep of 0.5 fs
timestep          0.0005
# Read data file
read_data        gp.data

# Force field settings
pair_style       airebo 3.0
pair_coeff       * * CH.airebo C

# Temperature computation
compute       ke1  all  ke/atom
variable      kb  equal 8.625e-5
variable      temp1 atom  c_ke1/1.5/${kb}      
# Thermodynamic output
thermo	      1000
thermo_style  custom    step    temp   pxx pyy pzz press  vol
# Temperature initialization
velocity	all create 300 898758 mom yes rot yes dist gaussian

# Energy minimization
min_style	    cg
minimize	    1.0e-8 1.0e-8 1000000 1000000

# Relaxation under NPT ensemble
thermo     2000
thermo_style   custom step temp pe ke etotal vol pxx pyy pzz press
fix         1 all npt temp 300 300 0.05 iso 0.0 0.0 0.5
dump	    1 all custom 100000 npt.xyz id type x y z 
run         500000
unfix       1
undump      1
reset_timestep 0

write_data  Gp.data

# Relaxation under NVT ensemble
thermo     2000
thermo_style   custom step temp pe ke etotal vol pxx pyy pzz press
fix         1 all nvt temp 300 300 0.05 
dump	    1 all custom 20000 nvt.xyz id type x y z 
run         100000
unfix       1
undump      1
reset_timestep 0

# Chunk parameter setup
variable X1 	 equal xlo
variable X2 	 equal xhi
variable Nlay    equal 100
variable Dscale  equal 1/${Nlay}   # Number of chunks
variable Len     equal ${X2}-${X1} # Total length
variable Dz      equal ${Len}/${Nlay} # Size of each chunk

# Fixed end and hot/cold source coordinates
variable   BL1    equal   ${X1}+2*${Dz}                 
variable   BL2    equal   ${X1}+6*${Dz}          
variable   BR1   equal   ${X2}-6*${Dz}          
variable   BR2   equal   ${X2}-2*${Dz}            

# Region setup
region	reg_all	block	${X1}  ${X2}   INF INF      INF INF     units box
# Left fixed end
region	fixed_L	block	INF    ${BL1}   INF INF      INF INF     units box
# Left hot source
region	Hot	block	${BL1}  ${BL2}   INF INF      INF INF     units box
# Right cold source
region	Cold	block	${BR1} ${BR2}  INF INF      INF INF     units box
# Right fixed end
region	fixed_R	block	${BR2} INF     INF INF      INF INF     units box

# Group atoms in regions
group	fixed_L		region	fixed_L         # Fixed end
group	Hot		    region	Hot         # Heat source
group	Cold		region	Cold        # Cold source
group	fixed_R		region	fixed_R        # Fixed end
group   mobile      subtract all fixed_L fixed_R

reset_timestep 0
# Change boundary conditions to fixed for heat transfer
tchange_box all boundary  f p p 

# Fix two ends
velocity   fixed_L      set 0  0  0  
velocity   fixed_R     set 0  0  0 
fix      fixed_L     fixed_L    setforce  0   0   0
fix      fixed_R     fixed_R   setforce  0   0   0

# Set langevin control for hot and cold sources
fix	  3	     Hot	langevin 400 400 0.05 14565 tally yes
fix	  4	     Cold	langevin 200 200 0.05 16576 tally yes
# NVE ensemble
fix   5      all   nve

# Define energy input/output for sources
variable Time 	 equal step
variable EL 	 equal f_3
variable ER 	 equal f_4

# Chunk setup
compute 18 all chunk/atom bin/1d x lower ${Dscale} units reduced
# Compute temperature for each chunk
fix 8 all ave/chunk 1 200000 200000 18 v_temp1 file temp_relax.dat

dump 1 all xyz 100000 relax.xyz
thermo 20000
thermo_style custom step temp ke pe etotal press vol
run 200000
unfix     8
undump    1
reset_timestep 0

# Save temperature and energy data for calculations
fix 11 all ave/chunk 1 10000000 10000000 18 v_temp1 file temp_equ.dat
fix	E_out	all print 2000 "${Time}  ${EL}  ${ER}" file Ener_equ.dat title "Time  E1  E2" screen no	

dump         1  all xyz 5000000 equ.xyz
thermo 1000000
thermo_style custom step temp ke pe etotal press vol
# Run simulation
run 10000000
```
