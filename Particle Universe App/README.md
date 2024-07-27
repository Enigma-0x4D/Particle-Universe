 === About ===

Particle Universe is a simple particle simulation sandbox, in which point-like particles move through space, interacting with each other in various ways.
The project was inspired by Tom Mohr's work "Particle Life", which I found on Youtube some time ago. (You can watch the orginal video here: https://www.youtube.com/watch?v=p4YirERTVF0)

There is no specific objective for what you can do in this program:
you can carefully place particles and build complex structures that will perform a specific task,
or simply place a lot of matter in one place and watch what will happen.

So... Have fun! :)


 === Controls ===

Right mouse button, Arrows	- Move around
Mouse wheel			- Zoom
Mouse wheel + LCtrl		- Change selection size
Mouse wheel + RCtrl		- Change displayed particle size

<, >, 1-9			- Select particle type
[, Side bottom mouse button	- Set the Action Force* to 2
], Side top mouse button	- Set the Action Force to 3

Left mouse button		- Create particle(s)
Left mouse button + P		- Create particle(s) with initial velocity
Left mouse button + LShift	- Remove particles in the selection
Left mouse button + LAlt	- Move particles in the selection
Left mouse button + F		- Apply force to particles in the selection
Left mouse button + L		- Slow down the particles inside the selection
Left mouse button + G		- Apply force towards the center of the selection on the particles inside of it
Left / Right mouse button + R	- Apply rotational force on the particles inside the selection
Left / Right mouse button + LAlt- Rotate particles inside the selection
Left mouse button + LCtrl + C	- Copy particles in the selection into the clipboard
Left mouse button + LCtrl + V	- Paste particles from the clipboard into the simulation

Space	- Pause or unpause the simulation
S	- Simulate a single step
C	- Open the console
Z	- Follow the nearest particle
O	- Set the simulation center to the current position
I	- Reset the camera position
H	- Switch the post-effect

F1	- Toggle the display of controls
F2	- Toggle the display of crosshair
F3	- Toggle the display of selection
F4	- Toggle the display of simulation sectors**


*Action Force parameter determines how strongly the user actions affect the simulation
(e.g. determines the number of particles to be created,
strength of the force applied, 
or how much the particles are to be slowed down).
By default it is equal to 1.

**The space in the simulation is subdivided into smaller sectors to reduce the number of computations and improve performance.


 === Simulation ===

The Universe in the simulation consists of a fixed* number of particles that can interact in two main ways:
by exerting a force on each other or changing types.

Every particle has 3 main parameters:

Type:
	The type of a particle determines how it interacts with other particles.
	It also affects how fast the particle loses its velocity, and (sometimes) what attraction function it uses in interactions.

Position:
	Stores the current location of a particle in space.

Velocity:
	Is added to position every simulation step.
	Can be changed by interactions with other particles, or by the friction applied to a particle.


Every simulation step, parameters of every particle are updated according to the pre-defined set of rules.
Now, I could tell you exactly how each particle behaves, but that would take away all the fun of exploring and discovering how everything works!
So, sorry, but you will have to experiment and test it for yourself! ;)


*The number of particles in simulation won't change on its own**, so the only way you can introduce new matter into the system is by adding it yourself.

**In some rare cases, when particle somehow will change its parameters in such a way that they become invalid
(e.g. by moving outside the 32-bit floating-point range, having an invalid type, ect.), it will be removed from simulation to prevent further errors.
