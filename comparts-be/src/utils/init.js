const sequelize = require("../config/database");
module.exports = {
	initCpu: (cpu) => {
		sequelize.sync({ force: true }).then(() => {
			cpu.bulkCreate([
				{
					name: "Core i3-10100F",
					mfr: "Intel",
					core_num: "4",
					thread_num: "8",
					base_freq: "3.6",
					turbo_freq: "4.3",
					cache: "8",
					socket: "LGA1200",
					tdp: "65",
					memory_type: "DDR4",
					memory_freq: "2666",
					process: "14",
					graphics: "",
					price: "2299000",
					img: "i3-10100f.jpg",
				},
				{
					name: "Core i9-10850K Avengers Edition",
					mfr: "Intel",
					core_num: "10",
					thread_num: "20",
					base_freq: "3.6",
					turbo_freq: "5.2",
					cache: "20",
					socket: "LGA1200",
					tdp: "95",
					memory_type: "DDR4",
					memory_freq: "2933",
					process: "14",
					graphics: "Intel UHD Graphics 630",
					price: "12599000",
					img: "i9-10850ka.jpg",
				},
				{
					name: "Ryzen 9 5950X",
					mfr: "AMD",
					core_num: "16",
					thread_num: "32",
					base_freq: "3.4",
					turbo_freq: "4.9",
					cache: "64",
					socket: "AM4",
					tdp: "105",
					memory_type: "DDR4",
					memory_freq: "3200",
					process: "7",
					graphics: "",
					price: "20899000",
					img: "r9-5950x.jpg",
				},
				{
					name: "Ryzen 3 3200G",
					mfr: "AMD",
					core_num: "4",
					thread_num: "4",
					base_freq: "3.6",
					turbo_freq: "4",
					cache: "4",
					socket: "AM4",
					tdp: "65",
					memory_type: "DDR4",
					memory_freq: "2933",
					process: "12",
					graphics: "Radeon Vega 8 Graphics",
					price: "2599000",
					img: "r3-3200g.jpg",
				},
				{
					name: "Core i5-9400F",
					mfr: "Intel",
					core_num: "6",
					thread_num: "6",
					base_freq: "2.9",
					turbo_freq: "4.1",
					cache: "9",
					socket: "LGA1151v2",
					tdp: "65",
					memory_type: "DDR4",
					memory_freq: "2666",
					process: "14",
					graphics: "",
					price: "3699000",
					img: "i5-9400f.jpg",
				},
				{
					name: "Pentium G5400",
					mfr: "Intel",
					core_num: "2",
					thread_num: "4",
					base_freq: "3.7",
					turbo_freq: null,
					cache: "35",
					socket: "LGA1151v2",
					tdp: "4",
					memory_type: "DDR4",
					memory_freq: "2400",
					process: "14",
					graphics: "Intel UHD Graphics 610",
					price: "1559000",
					img: "p-g5400.jpg",
				},
				{
					name: "Ryzen 5 3600",
					mfr: "AMD",
					core_num: "6",
					thread_num: "12",
					base_freq: "3.6",
					turbo_freq: "4.2",
					cache: "35",
					socket: "AM4",
					tdp: "65",
					memory_type: "DDR4",
					memory_freq: "3200",
					process: "7",
					graphics: "",
					price: "5199000",
					img: "r5-3600.jpg",
				},
				{
					name: "Athlon 3000G",
					mfr: "AMD",
					core_num: "2",
					thread_num: "4",
					base_freq: "3.5",
					turbo_freq: null,
					cache: "5",
					socket: "AM4",
					tdp: "35",
					memory_type: "DDR4",
					memory_freq: "2666",
					process: "14",
					graphics: "Radeon Vega 3 Graphics",
					price: "1259000",
					img: "a-3000g.jpg",
				},
				{
					name: "Core i7-8700K",
					mfr: "Intel",
					core_num: "6",
					thread_num: "12",
					base_freq: "3.7",
					turbo_freq: "4.7",
					cache: "12",
					socket: "LGA1151v2",
					tdp: "95",
					memory_type: "DDR4",
					memory_freq: "2666",
					process: "14",
					graphics: "Intel UHD Graphics 630",
					price: "9599000",
					img: "i7-8700k.jpg",
				},
				{
					name: "Core i5-8400",
					mfr: "Intel",
					core_num: "6",
					thread_num: "6",
					base_freq: "2.8",
					turbo_freq: "4",
					cache: "9",
					socket: "LGA1151v2",
					tdp: "65",
					memory_type: "DDR4",
					memory_freq: "2666",
					process: "14",
					graphics: "Intel UHD Graphics 630",
					price: "4999000",
					img: "i5-8400.jpg",
				},
				{
					name: "Ryzen 5 2600",
					mfr: "AMD",
					core_num: "6",
					thread_num: "12",
					base_freq: "3.4",
					turbo_freq: "3.9",
					cache: "19",
					socket: "AM4",
					tdp: "65",
					memory_type: "DDR4",
					memory_freq: "2933",
					process: "12",
					graphics: "",
					price: "3399000",
					img: "r5-2600.jpg",
				},
				{
					name: "Ryzen 7 2700",
					mfr: "AMD",
					core_num: "8",
					thread_num: "16",
					base_freq: "3.2",
					turbo_freq: "4.1",
					cache: "20",
					socket: "AM4",
					tdp: "65",
					memory_type: "DDR4",
					memory_freq: "2933",
					process: "12",
					graphics: "",
					price: "4599000",
					img: "r7-2700.jpg",
				},
				{
					name: "Core i9-9900K",
					mfr: "Intel",
					core_num: "8",
					thread_num: "16",
					base_freq: "3.6",
					turbo_freq: "5",
					cache: "16",
					socket: "LGA1151v2",
					tdp: "95",
					memory_type: "DDR4",
					memory_freq: "2666",
					process: "14",
					graphics: "Intel UHD Graphics 630",
					price: "10599000",
					img: "i9-9900k.jpg",
				},
				{
					name: "Core i9-9900X",
					mfr: "Intel",
					core_num: "10",
					thread_num: "20",
					base_freq: "3.5",
					turbo_freq: "4.5",
					cache: "19",
					socket: "LGA2066",
					tdp: "165",
					memory_type: "DDR4",
					memory_freq: "2666",
					process: "14",
					graphics: "",
					price: "14399000",
					img: "i9-9900x.jpg",
				},
				{
					name: "Ryzen Threadripper 3990X",
					mfr: "AMD",
					core_num: "64",
					thread_num: "128",
					base_freq: "2.9",
					turbo_freq: "4.3",
					cache: "292",
					socket: "sTRX4",
					tdp: "280",
					memory_type: "DDR4",
					memory_freq: "3200",
					process: "7",
					graphics: "",
					price: "102899000",
					img: "rt-3990x.jpg",
				},
				{
					name: "Core i9-9980XE Extreme Edition",
					mfr: "Intel",
					core_num: "18",
					thread_num: "36",
					base_freq: "3",
					turbo_freq: "4.5",
					cache: "24.75",
					socket: "LGA2066",
					tdp: "165",
					memory_type: "DDR4",
					memory_freq: "2666",
					process: "14",
					graphics: "",
					price: "26699000",
					img: "i9-9980xe.jpg",
				},
				{
					name: "Xeon Platinum 8180",
					mfr: "Intel",
					core_num: "28",
					thread_num: "56",
					base_freq: "2.5",
					turbo_freq: "3.8",
					cache: "205",
					socket: "LGA3647",
					tdp: "205",
					memory_type: "DDR4",
					memory_freq: "2666",
					process: "14",
					graphics: "",
					price: "319989000",
					img: "x-p8180.jpg",
				},
				{
					name: "Xeon Gold 6154",
					mfr: "Intel",
					core_num: "18",
					thread_num: "36",
					base_freq: "3",
					turbo_freq: "3.7",
					cache: "24.75",
					socket: "LGA3647",
					tdp: "200",
					memory_type: "DDR4",
					memory_freq: "2666",
					process: "14",
					graphics: "",
					price: "119089000",
					img: "x-g6154.jpg",
				},
				{
					name: "Core i9-10900K",
					mfr: "Intel",
					core_num: "10",
					thread_num: "20",
					base_freq: "3.7",
					turbo_freq: "5.3",
					cache: "20",
					socket: "LGA1200",
					tdp: "125",
					memory_type: "DDR4",
					memory_freq: "2933",
					process: "14",
					graphics: "Intel UHD Graphics 630",
					price: "13999000",
					img: "i9-10900k.jpg",
				},
				{
					name: "EPYC 7F32",
					mfr: "AMD",
					core_num: "8",
					thread_num: "16",
					base_freq: "3.7",
					turbo_freq: "3.9",
					cache: "128",
					socket: "SP3",
					tdp: "180",
					memory_type: "DDR4",
					memory_freq: "3200",
					process: "7",
					graphics: "",
					price: "65199000",
					img: "e-7f32.jpg",
				},
			]);
		});
	},
};