-- INSERTING DATA
insert into employee(nik, name, is_active, start_date, end_date, created_by, created_at, updated_by, updated_at)
values (11012, 'Budi', true, '2022-12-12', '2029-12-12', 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP),
(11013, 'Jarot', true, '2021-09-01', '2028-09-01', 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP);

insert into education (employee_id, name, level, description, created_by, created_at, updated_by, updated_at)
values (1, 'SMKN 7 Jakarta', 'SMA', 'Sekolah Menengah Atas', 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP),
(2, 'Universitas Negri Jakarta', 'Strata 1', 'Sarjana', 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP);

insert into employee_profile (employee_id, place_of_birth, date_of_birth, gender, is_married, created_by, created_at, updated_by, updated_at)
values (1, 'Jakarta', '1997-05-02', 'Laki-laki', true, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP),
(2, 'Sukabumi', '1996-05-02', 'Laki-laki', false, 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP);

insert into employee_family (employee_id, name, identifier, job, place_of_birth, date_of_birth, religion, is_life, is_divorced, relation_status, created_by, created_at, updated_by, updated_at)
values (1, 'Marni', '3210111112345512', 'Ibu Rumah Tangga', 'Denpasar', '1995-10-17', 'Islam', true, false, 'Istri', 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP),
(1, 'Clara', '3210111112345421', 'Pelajar', 'Bangkalan', '2008-09-01', 'Islam', true, false, 'Anak', 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP),
(1, 'Stephanie', '3210111112345622', 'Pelajar', 'Bangkalan', '2010-05-03', 'Islam', true, false, 'Anak', 'admin', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP);

--SELECT DATA
select id, nik, name, is_active, start_date, end_date from employee;

select * from education;

select * from employee_profile; 

select * from employee_family;


-- select report
select e.id as employee_id, nik, e.name, is_active, ep.gender as gender, 
	age(ep.date_of_birth::date) as umur, ed.name as school_name,
	ed.level as level,
	case 
		when (suami != 0 and anak != 0) then concat(suami, ' suami & ',anak,' anak') 
		when (istri != 0 and anak != 0) then concat(istri, ' istri & ',anak,' anak')
		when (suami != 0 and anak = 0) then concat (suami, ' suami')
		when (istri != 0 and anak = 0) then concat (istri, ' istri')
		when (suami = 0 or istri = 0) and (anak != 0 ) then concat(anak, ' anak')
		else '-'
	end as family_realtion
from employee e 
left join employee_profile ep on e.id = ep.employee_id
left join education ed ON e.id = ed.employee_id
left join (
		select employee_id, sum(suami) as suami, sum(istri) as istri, sum(anak) as anak
			
		from (select employee_id, 
		case relation_status
				when 'Suami' then 1
			else 0
		end as Suami,
		case relation_status
			when 'Istri' then 1
			else 0
		end as Istri,
		case relation_status
			when 'Anak' then 1
				else 0
			end as Anak from employee_family ef) as f
			group by 1
	)  as family  on family.employee_id = e.id;







--Testing
select employee_id, sum(suami) as suami, sum(istri) as istri, sum(anak) as anak	
from (select employee_id, 
case relation_status
		when 'Suami' then 1
	else 0
end as Suami,
case relation_status
	when 'Istri' then 1
	else 0
end as Istri,
case relation_status
	when 'Anak' then 1
		else 0
	end as Anak from employee_family ef) as f
	group by 1










