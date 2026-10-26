/**
 * Ethiopian Curriculum Dataset - English
 * FDRE Ministry of Education 2019 E.C.
 */

import { CurriculumSubjectDef } from './curriculum_am';

export const CURRICULUM_EN: Record<string, CurriculumSubjectDef[]> = {
  'Grade 9': [
    {
      name: 'Physics',
      code: 'PHY9',
      units: [
        {
          unitNumber: 1,
          title: 'Physics and Human Society',
          topics: ['What is Physics?', 'Standard Units and Dimensions', 'Errors and Uncertainty'],
          competencies: ['Identify base SI units', 'Record measurements accurately with significant figures']
        },
        {
          unitNumber: 2,
          title: 'One-Dimensional Motion',
          topics: ['Speed & Velocity', 'Uniform Acceleration', 'Kinematics Equations'],
          competencies: ['Apply equations of motion to rectilinear systems', 'Interpret velocity-time graphs']
        }
      ]
    },
    {
      name: 'Mathematics',
      code: 'MATH9',
      units: [
        {
          unitNumber: 1,
          title: 'The Number System',
          topics: ['Real Numbers', 'Radicals and Exponents', 'Scientific Notation'],
          competencies: ['Identify algebraic properties of real numbers', 'Simplify complex surds']
        }
      ]
    }
  ],
  'Grade 10': [
    {
      name: 'Physics',
      code: 'PHY10',
      units: [
        {
          unitNumber: 1,
          title: 'Motion in Two Dimensions',
          topics: ['Vector Decomposition', 'Projectile Trajectories', 'Uniform Circular Motion'],
          competencies: ['Calculate vector components', 'Determine time of flight and range']
        }
      ]
    }
  ],
  'Grade 11': [
    {
      name: 'Physics',
      code: 'Physics',
      units: [
        {
          unitNumber: 1,
          title: 'Measurement and Practical Work',
          topics: ['Error Propagation', '3D Coordinate Vectors', 'Dimensional Analysis'],
          competencies: ['Verify dimensional homogeneity', 'Calculate resultant vector magnitudes']
        },
        {
          unitNumber: 2,
          title: 'Two-Dimensional Motion',
          topics: ['Kinematics of Projectiles', 'Parabolic Trajectory Equations', 'Relative Velocity'],
          competencies: ['Model projectile trajectory in Ethiopian topography', 'Solve ESSLCE exam questions']
        },
        {
          unitNumber: 3,
          title: 'Newtonian Dynamics',
          topics: ['Newton’s Three Laws', 'Static & Kinetic Friction', 'Centripetal Force'],
          competencies: ['Construct free body diagrams', 'Calculate automotive stopping distances on Addis expressways']
        }
      ]
    },
    {
      name: 'Chemistry',
      code: 'Chemistry',
      units: [
        {
          unitNumber: 1,
          title: 'Atomic Structure and Periodicity',
          topics: ['Bohr Model', 'Quantum Numbers (n, l, m_l, m_s)', 'Electronic Configurations'],
          competencies: ['Write orbital notations for transition metals', 'Evaluate periodic trends']
        },
        {
          unitNumber: 2,
          title: 'Chemical Bonding',
          topics: ['Ionic and Covalent Bonds', 'VSEPR Molecular Geometry', 'Intermolecular Dipoles'],
          competencies: ['Predict molecular geometry', 'Explain hydrogen bonding in water']
        }
      ]
    },
    {
      name: 'Biology',
      code: 'Biology',
      units: [
        {
          unitNumber: 1,
          title: 'Biomolecules and the Cell',
          topics: ['Proteins and Nucleic Acids', 'Enzyme Kinetics', 'Membrane Transport Mechanisms'],
          competencies: ['Analyze enzyme reaction rates', 'Describe active transport and osmosis']
        }
      ]
    }
  ],
  'Grade 12': [
    {
      name: 'Physics',
      code: 'Physics',
      units: [
        {
          unitNumber: 1,
          title: 'Thermodynamics',
          topics: ['Laws of Thermodynamics', 'Entropy', 'Carnot Heat Engines'],
          competencies: ['Calculate engine thermal efficiency', 'Analyze heat transfer in clay injera mitad']
        },
        {
          unitNumber: 2,
          title: 'Electromagnetism',
          topics: ['Electric Fields', 'Magnetic Flux', 'Faraday’s Law & GERD Hydroelectric Turbines'],
          competencies: ['Calculate induced electromotive force', 'Understand high-voltage transmission']
        }
      ]
    }
  ]
};
